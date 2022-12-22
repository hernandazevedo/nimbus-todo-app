import { NimbusJSX, FC, State, condition, not } from '@zup-it/nimbus-backend-core'
import { Column, LocalImage, Row, Text, Touchable } from '@zup-it/nimbus-backend-layout'
import { ToDoItem } from 'src/types'

interface Props {
  value: State<ToDoItem>,
}

export const Note: FC<Props> = ({ value }) => (
  <Row crossAxisAlignment="center" padding={10}>
    <Touchable onPress={value.get('isDone').set(not(value.get('isDone')))}>
      <LocalImage localImageId={condition(value.get('isDone'), 'checked', 'unchecked')} width={32} height={32} />
    </Touchable>
    <Column marginHorizontal={20} width="expand">
      <Text weight="bold">{value.get('id')}: {value.get('title')}</Text>
      <Text>{value.get('description')}</Text>
    </Column>
    <LocalImage localImageId="delete" width={18} height={18} />
  </Row>
)
