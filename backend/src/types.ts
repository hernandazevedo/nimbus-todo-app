export type ToDoItemByDate = Record<string, ToDoItem[]>

export interface ToDoItem {
  id: number,
  title: string,
  description: string,
  date: number,
  isDone: boolean,
}
