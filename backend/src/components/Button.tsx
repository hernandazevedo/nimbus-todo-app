import { NimbusJSX, FC, Actions, Expression } from '@zup-it/nimbus-backend-core'
import { namespace } from 'src/constants'

interface Props {
  enabled?: Expression<boolean>,
  onPress: Actions,
  width?: Expression<number>,
  height?: Expression<number>,
  radius?: Expression<number>,
  fontSize?: Expression<number>,
  children?: Expression<string>,
}

export const Button: FC<Props> = ({ id, state, children, ...props }) =>
  <component namespace={namespace} name="checkbox" id={id} state={state} properties={{ text: children, ...props}} />
