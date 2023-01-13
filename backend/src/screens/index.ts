import { RouteMap } from '@zup-it/nimbus-backend-express'
import { EditNote } from './edit-note'
import { ToDoList } from './todo-list'

export const routes: RouteMap = {
  '': ToDoList,
  '/edit': EditNote,
}
