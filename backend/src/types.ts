export interface NoteSection {
  date: number,
  items: Note[],
}

export interface Note {
  id: number,
  title: string,
  description: string,
  date: number,
  isDone: boolean,
}
