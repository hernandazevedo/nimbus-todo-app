import { NimbusJSX, FC, Actions, Expression, State, createStateNode } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'

interface Props {
  label: Expression<string>,
  iconRight?: Expression<string>,
  value?: Expression<string>,
  color?: Expression<string>,
  onChange: (value: State<string>) => Actions,
}

export const TextInput: FC<Props> = ({ id, state, onChange, ...props }) => <component
  namespace={namespace}
  name="textInput"
  id={id}
  state={state}
  properties={{ onChange: onChange(createStateNode('onChange')), ...props }}
/>
