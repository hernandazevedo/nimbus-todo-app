import { RouteMap } from '@zup-it/nimbus-backend-express'
import { ToDoList } from './todo-list'

export const routes: RouteMap = {
  '': ToDoList,
}
