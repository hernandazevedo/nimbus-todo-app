import { DynamicExpression, Expression, Operation } from "@zup-it/nimbus-backend-core";
import { ToDoItemByDate } from "./types";

export const formatDate = (time: Expression<number | string>) =>
  new Operation<string>('formatDate', [time])

export const filterNotes = (
  notes: DynamicExpression<ToDoItemByDate>,
  text: Expression<string>,
  todo: Expression<boolean>,
  done: Expression<boolean>,
) => new Operation<ToDoItemByDate>('filterNotes', [notes, text, todo, done])
