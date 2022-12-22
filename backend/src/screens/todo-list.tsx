import { createState, ForEach, NimbusJSX, entries, If, Else, Then } from '@zup-it/nimbus-backend-core'
import { log, sendRequest } from '@zup-it/nimbus-backend-core/actions'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Column, Lifecycle, Positioned, Row, ScrollView, Stack, Text } from '@zup-it/nimbus-backend-layout'
import { filterNotes, formatDate } from '../operations'
import { showNotification } from '../actions'
import { Button } from '../components/Button'
import { Checkbox } from '../components/Checkbox'
import { Spinner } from '../components/Spinner'
import { TextInput } from '../components/TextInput'
import { todoUrl } from '../constants'
import { Note } from '../fragments/Note'
import { ToDoItemByDate } from '../types'
import { Expression } from '@zup-it/nimbus-backend-core'

export const ToDoList: Screen = ({ navigator }) => {
  const searchTerm = createState('searchTerm', '')
  const showToDo = createState('showToDo', true)
  const showDone = createState('showDone', true)
  const isLoading = createState('isLoading', true)
  const itemsByDate = createState<ToDoItemByDate>('toDoItems', {})
  const filteredItemsByDate = createState<ToDoItemByDate>('filteredItemsByDate', {})

  function filterToDo(value: Expression<boolean>) {
    return filteredItemsByDate.set(filterNotes(itemsByDate, searchTerm, value, showDone))
  }

  function filterDone(value: Expression<boolean>) {
    return filteredItemsByDate.set(filterNotes(itemsByDate, searchTerm, showToDo, value))
  }

  function filterText(value: Expression<string>) {
    return filteredItemsByDate.set(filterNotes(itemsByDate, value, showToDo, showDone))
  }

  const loadItems = sendRequest<ToDoItemByDate>({
    url: todoUrl,
    onSuccess: response => [
      itemsByDate.set(response.get('data')),
      filteredItemsByDate.set(response.get('data')),
    ],
    onError: response => [
      log({ level: 'error', message: response.get('message') }),
      showNotification({ type: 'error', message: 'Could not load notes.' }),
    ],
    onFinish: isLoading.set(false),
  })

  const header = (
    <Column marginBottom={20}>
      <TextInput label="Search" value={searchTerm} onChange={value => [searchTerm.set(value), filterText(value)]} />
      <Row marginTop={6}>
        <Row marginEnd={10}>
          <Checkbox label="To do" checked={showToDo} onChange={value => [showToDo.set(value), filterToDo(value)]} />
        </Row>
        <Checkbox label="Done" checked={showDone} onChange={value => [showDone.set(value), filterDone(value)]} />
      </Row>
    </Column>
  )

  const notes = (
    <ScrollView>
      <ForEach items={entries(filteredItemsByDate)} key="key">
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
    <Lifecycle onInit={loadItems} state={[isLoading, itemsByDate, filteredItemsByDate, searchTerm, showToDo, showDone]}>
      <If condition={isLoading}>
        <Then>{loading}</Then>
        <Else>
          <Stack width="expand" height="expand">
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
