import { NimbusJSX, FC, Actions, Expression } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'
import { IconName } from './Icon'

interface Props {
  onPress: Actions,
  icon: Expression<IconName>,
}

export const CircularButton: FC<Props> = ({ id, state, ...props }) =>
  <component namespace={namespace} name="circularButton" id={id} state={state} properties={props} />
