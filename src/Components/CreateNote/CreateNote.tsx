import { useContext, useState } from 'react'
import './CreateNote.css'
import { NotesContext } from '../../Context/NoteContext'
import { DateContext } from '../../Context/DateContext'
import { NoteType } from '../../Models/Models'
import { AuthContext } from '../../Context/UserContext'
import { PostNote } from '../../Data/NotesData'
import { notify } from '../../App'
import { RxDoubleArrowDown } from 'react-icons/rx'



function CreateNote() {
  const [toggle, setToggle] = useState<"form" | "button">("button")
  const [inputs, setInputs] = useState({
    content: ""
  })
  const { state, dispatch } = useContext(NotesContext)
  const { user } = useContext(AuthContext)
  const { date } = useContext(DateContext)


  const [folder, setFolder] = useState<string>("Others")

  const folders: string[] = []
  state?.map(note => {
    let typeName = note.folder
    if (!typeName)
      typeName = "Others"
    if (!folders.includes(typeName)) {
      folders.push(typeName)
    }
  })

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (inputs.content == "")
      return notify("error", "All fields must be filled")
    const note: NoteType = {
      content: inputs.content,
      folder,
      date
    }

    PostNote(note, user.token).then(
      note => {
        dispatch({
          type: "ADDNOTE",
          payload: note
        })
      }
    )
    setInputs({
      content: ""
    })
    setToggle("button")
  }
  return (
    <>
      {toggle == "button" &&
        <div
          className='button'
          onClick={() => { setToggle("form") }}
        >
          Add Note
          <RxDoubleArrowDown />
        </div>
      }
      {toggle == "form" &&
        <form className='addtask--container' onSubmit={HandleSubmit}>
          <h4 >Add Note</h4>
          <textarea
            placeholder='note...'
            value={inputs.content}
            onChange={(e) => setInputs((prev: any) => ({
              ...prev, content: e.target.value
            }))}
          />
          <div className='type--addnote'>
            <input
              placeholder='folder...'
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            />
            <select
              value={folder}
              onChange={(e) => { setFolder(e.target.value) }}
            >
              {folders.map(folder => (
                <option key={folder} value={folder}>{folder}</option>
              ))}
            </select>
          </div>
          <button >Add</button>
        </form>}
    </>
  )
}

export default CreateNote