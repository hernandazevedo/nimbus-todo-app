import { createState, ForEach, NimbusJSX, entries, If, Else, Then } from '@zup-it/nimbus-backend-core'
import { log, sendRequest } from '@zup-it/nimbus-backend-core/actions'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, Lifecycle, Positioned, Row, ScrollView, Stack, Text } from '@zup-it/nimbus-backend-layout'
import { formatDate } from '../operations'
import { showNotification } from '../actions'
import { Button } from '../components/Button'
import { Checkbox } from '../components/Checkbox'
import { Spinner } from '../components/Spinner'
import { TextInput } from '../components/TextInput'
import { todoUrl } from '../constants'
import { Note } from '../fragments/Note'
import { ToDoItemByDate } from '../types'

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
      log({ level: 'error', message: response.get('message') }),
      showNotification({ type: 'error', message: 'Could not load notes.' }),
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
    <ScrollView>
      <ForEach items={entries(itemsByDate)} key="key">
        {(entry) => (
          <Column width="expand" marginHorizontal={12} marginBottom={20}>
            <Text weight="bold" size={16}>{formatDate(entry.get('key'))}</Text>
            <ForEach items={entry.get('value')} key="id">
              {item => <Note value={item} />}
            </ForEach>
          </Column>
        )}
      </ForEach>
    </ScrollView>
  )

  const addNoteButton = (
    <Positioned alignment="bottomEnd" margin={20}>
      <Button width={50} height={50} radius={25} fontSize={24} onPress={showNotification({ type: 'info', message: 'This will add new notes' })}>
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
            <Positioned>
              {header}
              {notes}
            </Positioned>
            {addNoteButton}
          </Stack>
        </Else>
      </If>
    </Lifecycle>
  )
}
