import { NimbusJSX, FC, Expression } from '@zup-it/nimbus-backend-core'
import { Column, LocalImage, Row, Text } from '@zup-it/nimbus-backend-layout'

interface Props {
  title: Expression<string>,
  description: Expression<string>,
  isDone: Expression<boolean>,
}

export const Note: FC<Props> = ({ description, isDone, title }) => (
  <Row crossAxisAlignment="center">
    <LocalImage localImageId={isDone ? 'checked' : 'unchecked'} width={32} height={32} />
    <Column marginStart={20}>
      <Text weight="bold">{title}</Text>
      <Text>{description}</Text>
    </Column>
  </Row>
)
