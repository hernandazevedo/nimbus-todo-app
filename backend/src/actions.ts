import { createAction } from "@zup-it/nimbus-backend-core"
import { namespace } from "./constants"

interface ActionParams {
  message: string,
  duration?: number,
  type: 'error' | 'info' | 'warning',
}

export const showNotification = createAction<ActionParams>('showNotification', namespace)
