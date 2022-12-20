import { createState, ForEach, NimbusJSX, entries, If, Else, Then } from '@zup-it/nimbus-backend-core'
import { log, sendRequest } from '@zup-it/nimbus-backend-core/actions'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, Lifecycle, Positioned, Row, Stack, Text } from '@zup-it/nimbus-backend-layout'
import { showNotification } from 'src/actions'
import { Button } from 'src/components/Button'
import { Checkbox } from 'src/components/Checkbox'
import { Spinner } from 'src/components/Spinner'
import { TextInput } from 'src/components/TextInput'
import { todoUrl } from 'src/constants'
import { Note } from 'src/fragments/Note'
import { ToDoItem, ToDoItemByDate } from 'src/types'

export const ToDoList: Screen = ({ navigator }) => {
  const searchTerm = createState('searchTerm', '')
  const showToDo = createState('showToDo', true)
  const showDone = createState('showDone', true)
  const isLoading = createState('isLoading', true)
  const itemsByDate = createState<ToDoItemByDate>('toDoItems', {})

  const loadItems = sendRequest<ToDoItemByDate>({
    url: todoUrl,
    onSuccess: response => itemsByDate.set(response.get('data')),
    onError: response => [
      showNotification({ type: 'error', message: 'Could not load notes.' }),
      log({ level: 'error', message: response.get('message') })
    ],
    onFinish: isLoading.set(false),
  })

  const header = (
    <Column marginBottom={20}>
      <TextInput label="Search" value={searchTerm} onChange={value => searchTerm.set(value)} />
      <Row marginTop={6}>
        <Row marginEnd={10}>
          <Checkbox label="To do" checked={showToDo} onChange={value => showToDo.set(value)} />
        </Row>
        <Checkbox label="Done" checked={showDone} onChange={value => showDone.set(value)} />
      </Row>
    </Column>
  )

  const notes = (
    <ForEach items={entries(itemsByDate)} key="key">
      {(entry) => (
        <Column>
          <Text weight="bold">{entry.get('key')}</Text>
          <ForEach items={entry.get('value')} key="id">
            {item => <Note title={item.get('title')} description={item.get('description')} isDone={item.get('isDone')} />}
          </ForEach>
        </Column>
      )}
    </ForEach>
  )

  const addNoteButton = (
    <Positioned alignment="bottomEnd" margin={20}>
      <Button width={50} height={50} radius={25} fontSize={18} onPress={showNotification({ type: 'info', message: 'This will add new notes' })}>
        +
      </Button>
    </Positioned>
  )

  const loading = (
    <Column width="expand" height="expand" mainAxisAlignment="center" crossAxisAlignment="center">
      <Spinner />
    </Column>
  )

  return (
    <Lifecycle onInit={loadItems} state={[isLoading, itemsByDate]}>
      <If condition={isLoading}>
        <Then>{loading}</Then>
        <Else>
          <Stack width="expand" height="expand" state={[searchTerm, showToDo, showDone]}>
            {header}
            {notes}
            {addNoteButton}
          </Stack>
        </Else>
      </If>
    </Lifecycle>
  )
}
