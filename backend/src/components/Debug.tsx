import { WithChildren } from '@zup-it/nimbus-backend-core'
import { NimbusJSX, FC } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'

export const Debug: FC<WithChildren> = ({ id, state, children }) =>
  <component namespace={namespace} name="debugContainer" id={id} state={state}>
    {children}
  </component>
