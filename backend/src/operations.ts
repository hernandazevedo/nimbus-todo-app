import { DynamicExpression, Expression, Operation } from "@zup-it/nimbus-backend-core"
import { NoteSection } from "./types"

export const formatDate = (time: Expression<number>) =>
  new Operation<string>('formatDate', [time])

export const filterNotes = (
  notes: DynamicExpression<NoteSection[]>,
  text: Expression<string>,
  todo: Expression<boolean>,
  done: Expression<boolean>,
) => new Operation<NoteSection[]>('filterNotes', [notes, text, todo, done])
