import { NimbusJSX, FC } from '@zup-it/nimbus-backend-core'
import { namespace } from '../constants'

export const Spinner: FC = ({ id, state }) =>
  <component namespace={namespace} name="spinner" id={id} state={state} />
