import { NimbusJSX, FC, Actions, Expression } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'

interface Props {
  message: Expression<string>,
  onHide: Actions,
}

export const Toast: FC<Props> = ({ id, state, ...props }) =>
  <component namespace={namespace} name="toast" id={id} state={state} properties={props} />
