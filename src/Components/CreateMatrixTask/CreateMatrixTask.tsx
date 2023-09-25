import { useContext, useState } from 'react'
import './CreateMatrixTask.css'
import { AuthContext } from '../../Context/UserContext'
import { MatrixTasksContext } from '../../Context/MatrixTaskContext'
import { AddNote } from '../../Data/MatrixNotesData'
import { BiExit, BiCommentAdd } from 'react-icons/bi'
import { notify } from '../../App'

function CreateMatrixTask() {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
    type: "ImportUrgant"
  })
  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(MatrixTasksContext)
  const [isShowen, setIsShowen] = useState<"Button" | "Layout">("Button")

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputs.content == "" || inputs.title == "")
      return notify("error", "All fields must be filled")

    AddNote(inputs, user.token).then(
      note => {
        dispatch({
          type: "ADDNOTE",
          payload: note,
          NoteType: inputs.type
        })
      }
    )
    setInputs({
      title: "",
      content: "",
      type: "ImportUrgant"
    })
  }
  return (
    <div className="create--note">
      {isShowen == "Button" &&
        <div
          className='plus--button'
          onClick={() => { setIsShowen("Layout") }}
        >
          <BiCommentAdd />
        </div>}
      {isShowen == "Layout" &&
        <form className="add--note" onSubmit={HandleSubmit}>
          <BiExit
            className='cancel--addnote'
            onClick={() => {
              setIsShowen("Button");
              setInputs({
                title: "",
                content: "",
                type: "ImportUrgant"
              })
            }}
          />
          <div className='input--container'>
            <input
              placeholder='title...'
              value={inputs.title}
              onChange={(e) => setInputs(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>
          <div className='input--container'>
            <textarea
              placeholder='content...'
              value={inputs.content}
              onChange={(e) => setInputs(prev => ({ ...prev, content: e.target.value }))}
            />
          </div>
          <div className='input--container'>
            <div className="note--type">
              <div className={`types ${(inputs.type === "ImportUrgant") ? "selected--type" : ""}`}
                onClick={() => setInputs(prev => ({ ...prev, type: "ImportUrgant" }))}>
                important | urgent
              </div>
              <div className={`types ${(inputs.type === "ImportNotUrgant") ? "selected--type" : ""}`}
                onClick={() => setInputs(prev => ({ ...prev, type: "ImportNotUrgant" }))}
              >
                important | not urgent
              </div>
              <div className={`types ${(inputs.type === "NotImportUrgant") ? "selected--type" : ""}`}
                onClick={() => setInputs(prev => ({ ...prev, type: "NotImportUrgant" }))}
              >
                not important | urgent
              </div>
              <div className={`types ${(inputs.type === "NotImportNotUrgant") ? "selected--type" : ""}`}
                onClick={() => setInputs(prev => ({ ...prev, type: "NotImportNotUrgant" }))}
              >
                not important | not urgent
              </div>
            </div>
          </div>
          <button className='submit--addnote'> Add Note</button>
        </form>
      }
    </div>
  )
}

export default CreateMatrixTask