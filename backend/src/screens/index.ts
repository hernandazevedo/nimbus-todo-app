import { RouteMap } from '@zup-it/nimbus-backend-express'
import { Home } from './home'
import { ToDoList } from './todo-list'

export const routes: RouteMap = {
  '': ToDoList,
  '/home': Home,
}
