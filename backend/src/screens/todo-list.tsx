import { createState, ForEach, NimbusJSX, If, Else, Then, or, contains, and, State, isEmpty, not } from '@zup-it/nimbus-backend-core'
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
import { NoteCard } from '../fragments/NoteCard'
import { Note, NoteSection } from '../types'
import { Expression } from '@zup-it/nimbus-backend-core'
import { Icon } from '../components/Icon'

export const ToDoList: Screen = ({ navigator }) => {
  const searchTerm = createState('searchTerm', '')
  const showToDo = createState('showToDo', true)
  const showDone = createState('showDone', true)
  const isLoading = createState('isLoading', true)
  const notes = createState<NoteSection[]>('notes', [])

  const loadItems = sendRequest<NoteSection[]>({
    url: todoUrl,
    onSuccess: response => notes.set(response.get('data')),
    onError: response => [
      log({ level: 'error', message: response.get('message') }),
      showNotification({ type: 'error', message: 'Could not load notes.' }),
    ],
    onFinish: isLoading.set(false),
  })

  const header = (
    <Row backgroundColor="#5F72C0" crossAxisAlignment="center" paddingHorizontal={10} paddingVertical={5}>
      <Icon name="search" color="#FFFFFF" width={42} height={42} />
      <TextInput color="#FFFFFF" label="Search" value={searchTerm} onChange={value => [searchTerm.set(value)]} />
      {/* <Row marginTop={6}>
        <Row marginEnd={10}>
          <Checkbox label="To do" checked={showToDo} onChange={value => [showToDo.set(value)]} />
        </Row>
        <Checkbox label="Done" checked={showDone} onChange={value => [showDone.set(value)]} />
      </Row> */}
    </Row>
  )

  const shouldShowItem = (item: State<Note>) => {
    const matchesTextFilter = or(
      isEmpty(searchTerm),
      contains(item.get('title'), searchTerm),
      contains(item.get('description'), searchTerm),
    )
    const matchesDoneFilter = or(
      and(showToDo, not(item.get('isDone'))),
      and(showDone, item.get('isDone')),
    )
    return and(matchesTextFilter, matchesDoneFilter)
  }

  const body = (
    <ScrollView>
      <ForEach items={notes} key="date">
        {(section) => (
          <>
            <Column padding={12}>
              <Text size={16} color="#616B76">{formatDate(section.get('date'))}</Text>
            </Column>
            <ForEach items={section.get('items')} key="id">
              {item => (
                <If condition={shouldShowItem(item)}>
                  <Then>
                    <NoteCard value={item} />
                  </Then>
                </If>
              )}
            </ForEach>
          </>
        )}
      </ForEach>
    </ScrollView>
  )

  const addNoteButton = (
    <Positioned alignment="bottomEnd" margin={14}>
      <Button
        backgroundColor="#5F72C0"
        width={50}
        height={50}
        radius={25}
        fontSize={24}
        onPress={showNotification({ type: 'info', message: 'This will add new notes' })}
      >
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
    <Lifecycle onInit={loadItems} state={[isLoading, notes, searchTerm, showToDo, showDone]}>
      <Column height="expand" width="expand" backgroundColor="#F1F3F5">
        <If condition={isLoading}>
          <Then>{loading}</Then>
          <Else>
            <Stack width="expand" height="expand">
              <Positioned>
                {header}
                {body}
              </Positioned>
              {addNoteButton}
            </Stack>
          </Else>
        </If>
      </Column>
    </Lifecycle>
  )
}
