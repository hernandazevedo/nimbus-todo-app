import { NimbusJSX, FC, Expression } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'

export type IconName = 'search' | 'delete' | 'plus'

interface Props {
  name: Expression<IconName>,
  color?: Expression<string>,
  size?: Expression<number>,
}

export const Icon: FC<Props> = ({ id, state, ...props }) =>
  <component namespace={namespace} name="icon" id={id} state={state} properties={props} />
