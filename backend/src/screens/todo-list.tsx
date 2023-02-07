import { createState, ForEach, NimbusJSX, If, Else, Then, or, contains, and, State, isEmpty, not, eq, subtract, length, lowercase } from '@zup-it/nimbus-backend-core'
import { log, sendRequest } from '@zup-it/nimbus-backend-core/actions'
import { Column, Lifecycle, Positioned, Row, ScreenComponent, ScrollView, Stack, Text } from '@zup-it/nimbus-backend-layout'
import { formatDate } from '../operations'
import { CircularButton } from '../components/CircularButton'
import { Spinner } from '../components/Spinner'
import { TextInput } from '../components/TextInput'
import { todoAPIUrl, todoAPIKey } from '../constants'
import { NoteCard } from '../fragments/NoteCard'
import { Note, NoteSection } from '../types'
import { Icon } from '../components/Icon'
import { Screen } from '@zup-it/nimbus-backend-express'
import { Separator } from '../fragments/Separator'
import { SelectionGroup } from '../components/SelectionGroup'
import { Toast } from '../components/Toast'
import { EditNote } from './edit-note'

export const ToDoList: Screen = ({ navigator }) => {
  const searchTerm = createState('searchTerm', '')
  const doneFilter = createState<'All' | 'To do' | 'Done'>('doneFilter', 'All')
  const isLoading = createState('isLoading', true)
  const notes = createState<NoteSection[]>('notes', [])
  const toastMessage = createState('toastMessage', '')

  const loadItems = sendRequest<NoteSection[]>({
    url: `${todoAPIUrl}/notes`,
    headers: { key: todoAPIKey() },
    onSuccess: response => notes.set(response.get('data')),
    onError: response => [
      log({ level: 'error', message: response.get('message') }),
      toastMessage.set('Unable to load the notes'),
    ],
    onFinish: isLoading.set(false),
  })

  const header = (
    <Row backgroundColor="#5F72C0" crossAxisAlignment="center" paddingHorizontal={20} height={65}>
      <Icon name="search" color="#FFFFFF" size={28} />
      <Row width="expand">
        <TextInput header color="#FFFFFF" label="Search" value={searchTerm} onChange={value => [searchTerm.set(value)]} />
      </Row>
      <SelectionGroup options={["All", "To do", "Done"]} value={doneFilter} onChange={value => doneFilter.set(value)} />
    </Row>
  )

  const shouldShowItem = (item: State<Note>) => {
    const matchesTextFilter = or(
      isEmpty(searchTerm),
      contains(lowercase(item.get('title')), lowercase(searchTerm)),
      contains(lowercase(item.get('description')), lowercase(searchTerm)),
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
                    <NoteCard
                      value={item}
                      onShowEditModal={navigator.present(
                        EditNote,
                        {
                          state: { note: item },
                          events: {
                            onSaveNote: () => loadItems,
                          },
                        }
                      )}
                    />
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
      <CircularButton
        icon="plus"
        onPress={toastMessage.set('A modal should be shown here')}
      />
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
    <ScreenComponent safeAreaTopBackground="#5F72C0" statusBarColorScheme="dark" ignoreSafeArea={['bottom']}>
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
    </ScreenComponent>
  )
}
