export const AddNote = async (inputs: any, token: string | null) => {
  const response = await fetch("https://heisenberg-matrix-backend.onrender.com/api/MatrixTask", {
    method: "POST",
    headers: {
      "Content-Type": "Application/json",
      "authorization": `bearer ${token}`
    },
    body: JSON.stringify({ ...inputs })
  })
  const note = await response.json()
  return note
}
export const DeleteMatrixTask = async (TaskId: string, token: string | null) => {
  try {
    await fetch(`https://heisenberg-matrix-backend.onrender.com/api/MatrixTask/${TaskId}`, {
      method: "DELETE",
      headers: {
        "authorization": `bearer ${token}`
      }
    })
  } catch (err) {
    return err
  }
}

export const MoveMatrixTask = async (TaskId: string, token: string | null, NewType: string) => {
  try {
    await fetch(`https://heisenberg-matrix-backend.onrender.com/api/MatrixTask/${TaskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
        "authorization": `bearer ${token}`
      },
      body: JSON.stringify({ type: NewType })
    })
  } catch (err) {
    return err
  }
}

export const CheckMatrixTask = async (TaskId: string, token: string | null) => {
  try {
    await fetch(`https://heisenberg-matrix-backend.onrender.com/api/MatrixTask/${TaskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
        "authorization": `bearer ${token}`
      },
      body: JSON.stringify({ isDone: true })
    })
  } catch (err) {
    return err
  }
}

