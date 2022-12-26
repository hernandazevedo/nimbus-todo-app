import { RouteMap } from '@zup-it/nimbus-backend-express'
import { Test } from './test'
import { ToDoList } from './todo-list'

export const routes: RouteMap = {
  '': ToDoList,
  '/test': Test,
}
