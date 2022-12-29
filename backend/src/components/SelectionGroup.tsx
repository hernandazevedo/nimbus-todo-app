import { NimbusJSX, FC, Actions, Expression, State, createStateNode, ComponentProps } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'

interface Props {
  options: Expression<string[]>,
  value: Expression<string>,
  onChange: (value: State<string>) => Actions,
}

export const SelectionGroup: FC<Props> = ({ id, state, onChange, ...props }) =>
  <component
    namespace={namespace}
    name="selectionGroup"
    id={id}
    state={state}
    properties={{ onChange: onChange(createStateNode('onChange')), ...props }}
  />
