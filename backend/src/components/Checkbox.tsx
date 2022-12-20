import { NimbusJSX, FC, Actions, Expression, State, createStateNode } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'

interface Props {
  checked: Expression<boolean>,
  label: Expression<string>,
  onChange: (value: State<boolean>) => Actions,
}

export const Checkbox: FC<Props> = ({ id, state, onChange, ...props }) =>
  <component namespace={namespace} name="checkbox" id={id} state={state} properties={{ onChange: onChange(createStateNode('onChange')), ...props }} />
