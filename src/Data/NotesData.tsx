import { NoteType } from "../Models/Models"

export const PostNote = async (note: NoteType, token: string | null) => {
  const response = await fetch(`https://heisenberg-matrix-backend.onrender.com/api/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "authorization": `bearer ${token}`
    },
    body: JSON.stringify(note)
  })
  return await response.json()
}
export const DeleteNote = async (NoteId: String | undefined, token: string | null) => {
  try {
    await fetch(`https://heisenberg-matrix-backend.onrender.com/api/notes/${NoteId}`, {
      method: "DELETE",
      headers: {
        "authorization": `bearer ${token}`
      }
    })
  } catch (error) {
    return error
  }

}