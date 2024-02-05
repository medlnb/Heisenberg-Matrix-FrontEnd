import { TaskType } from "../Models/Models"

export const PostTask = async (task: TaskType, token: string | null) => {
  const response = await fetch(`https://heisenberg-matrix-back-end.vercel.app/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "authorization": `bearer ${token}`
    },
    body: JSON.stringify(task)
  })
  return await response.json()
}
export const DeleteTask = async (TaskId: String | undefined, token: string | null) => {
  try {
    await fetch(`https://heisenberg-matrix-back-end.vercel.app/api/tasks/${TaskId}`, {
      method: "DELETE",
      headers: {
        "authorization": `bearer ${token}`
      }
    })
  } catch (error) {
    return error
  }

}
export const CheckTask = async (TaskId: string | undefined, token: string | null) => {
  try {
    await fetch(`https://heisenberg-matrix-back-end.vercel.app/api/tasks/${TaskId}`, {
      method: "PATCH",
      headers: {
        "authorization": `bearer ${token}`
      }
    })
  } catch (error) {
    return error
  }
}