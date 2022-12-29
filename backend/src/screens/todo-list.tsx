import { createState, ForEach, NimbusJSX, If, Else, Then, or, contains, and, State, isEmpty, not, eq, subtract, length } from '@zup-it/nimbus-backend-core'
import { log, sendRequest } from '@zup-it/nimbus-backend-core/actions'
import { Column, Lifecycle, Positioned, Row, ScrollView, Stack, Text } from '@zup-it/nimbus-backend-layout'
import { formatDate } from '../operations'
import { showNotification } from '../actions'
import { Button } from '../components/Button'
import { Spinner } from '../components/Spinner'
import { TextInput } from '../components/TextInput'
import { todoUrl } from '../constants'
import { NoteCard } from '../fragments/NoteCard'
import { Note, NoteSection } from '../types'
import { Icon } from '../components/Icon'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Separator } from '../fragments/Separator'
import { SelectionGroup } from '../components/SelectionGroup'
import { Toast } from '../components/Toast'

export const ToDoList: Screen = ({ navigator }) => {
  const searchTerm = createState('searchTerm', '')
  const doneFilter = createState<'All' | 'To do' | 'Done'>('doneFilter', 'All')
  const isLoading = createState('isLoading', true)
  const notes = createState<NoteSection[]>('notes', [])
  const toastMessage = createState('toastMessage', '')

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
    <Row backgroundColor="#5F72C0" crossAxisAlignment="center" paddingHorizontal={20} height={65}>
      <Icon name="search" color="#FFFFFF" size={28} />
      <Row width="expand">
        <TextInput color="#FFFFFF" label="Search" value={searchTerm} onChange={value => [searchTerm.set(value)]} />
      </Row>
      <SelectionGroup options={["All", "To do", "Done"]} value={doneFilter} onChange={value => doneFilter.set(value)} />
    </Row>
  )

  const shouldShowItem = (item: State<Note>) => {
    const matchesTextFilter = or(
      isEmpty(searchTerm),
      contains(item.get('title'), searchTerm),
      contains(item.get('description'), searchTerm),
    )
    const matchesDoneFilter = or(
      eq(doneFilter, "All"),
      and(eq(doneFilter, "To do"), not(item.get('isDone'))),
      and(eq(doneFilter, "Done"), item.get('isDone')),
    )
    return and(matchesTextFilter, matchesDoneFilter)
  }

  const body = (
    <ScrollView>
      <ForEach items={notes} key="date" iteratorName="section">
        {(section) => (
          <>
            <Column paddingVertical={12} paddingHorizontal={20}>
              <Text size={16} color="#616B76">{formatDate(section.get('date'))}</Text>
            </Column>
            <Separator />
            <ForEach items={section.get('items')} key="id">
              {(item) => (
                <If condition={shouldShowItem(item)}>
                  <Then>
                    <NoteCard value={item} />
                    <Separator />
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
    <Positioned alignment="bottomEnd" margin={28}>
      <Button
        backgroundColor="#5F72C0"
        foregroundColor="#FFFFFF"
        width={50}
        height={50}
        radius={25}
        fontSize={24}
        onPress={toastMessage.set('A modal should be shown here')}
      >
        +
      </Button>
    </Positioned>
  )

  const toast = (
    <Positioned alignment="bottomCenter" marginBottom={16}>
      <Toast message={toastMessage} onHide={toastMessage.set('')} />
    </Positioned>
  )

  const loading = (
    <Column width="expand" height="expand" mainAxisAlignment="center" crossAxisAlignment="center">
      <Spinner />
    </Column>
  )

  return (
    <Lifecycle onInit={loadItems} state={[isLoading, notes, searchTerm, doneFilter, toastMessage]}>
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
              {toast}
            </Stack>
          </Else>
        </If>
      </Column>
    </Lifecycle>
  )
}
