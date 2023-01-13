import { NimbusJSX, FC, Actions, Expression } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'

interface Props {
  onPress: Actions,
  children?: Expression<string>,
  primary?: boolean,
}

export const Button: FC<Props> = ({ id, state, children, ...props }) =>
  <component namespace={namespace} name="button" id={id} state={state} properties={{ text: children, ...props}} />
