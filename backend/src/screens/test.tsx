import { contains, createState, ForEach, If, NimbusJSX, Then } from "@zup-it/nimbus-backend-core"
import { Screen } from "@zup-it/nimbus-backend-express"
import { Column, Text } from "@zup-it/nimbus-backend-layout"
import { TextInput } from "../components/TextInput"

export const Test: Screen = () => {
  const searchTerm = createState('searchTerm', '')
  const items = [
    { id: 1, title: 'Hello darkness, my old friend' },
    { id: 2, title: 'É ela a morena, que vem e que passa' },
    { id: 3, title: 'Ne me quitte pas, Il fault oublier' }
  ]

  return (
    <Column id="content" state={searchTerm}>
      <TextInput id="filter" value={searchTerm} onChange={value => searchTerm.set(value)} label="search" />
      <ForEach items={items} key="id">
        {(item) => (
          <If condition={contains(item.get('title'), searchTerm)}>
            <Then>
              <Text>{item.get('title')}</Text>
            </Then>
          </If>
        )}
      </ForEach>
    </Column>
  )
}
