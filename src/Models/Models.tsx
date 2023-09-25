export interface MatrixTask {
  content: string,
  type: "ImportUrgant" | "ImportNotUrgant" | "NotImportUrgant" | "NotImportNotUrgant"
  user_id: string,
  isDone: boolean,
  title: string,
  _id: string,
  updatedAt: string

}

export interface MatrixTasksType {
  ImportUrgant: MatrixTask[],
  ImportNotUrgant: MatrixTask[],
  NotImportUrgant: MatrixTask[],
  NotImportNotUrgant: MatrixTask[]
}
export interface User {
  username: string | null,
  token: string | null,
  email: string | null
}
export interface DateType {
  dayName: string,
  day: number,
  month: number,
  year: number
}
export interface TaskType {
  _id?: string,
  title: string,
  date: DateType,
  checked?: boolean,
  folder: string
}
export interface NoteType {
  _id?: string,
  content: string,
  date: DateType,
  folder: string
}
export interface MatrixTaskTypes {
  ImportUrgant: "ImportUrgant",
  ImportNotUrgant: "ImportNotUrgant",
  NotImportUrgant: "NotImportUrgant",
  NotImportNotUrgant: "NotImportNotUrgant"
}