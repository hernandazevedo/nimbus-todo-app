import { NimbusJSX, FC, Actions, Expression, State, createStateNode } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'

interface Props {
  label: Expression<string>,
  value?: Expression<number>,
  onChange: (value: State<number>) => Actions,
}

export const DatePicker: FC<Props> = ({ id, state, onChange, ...props }) => <component
  namespace={namespace}
  name="datePicker"
  id={id}
  state={state}
  properties={{ onChange: onChange(createStateNode('onChange')), ...props }}
/>
