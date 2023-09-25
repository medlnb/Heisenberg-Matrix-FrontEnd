import { useContext } from 'react'
import './Note.css'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { AuthContext } from '../../Context/UserContext'
import { NotesContext } from '../../Context/NoteContext'
import { NoteType } from '../../Models/Models'
import { DeleteNote } from '../../Data/NotesData'


interface props {
  note: NoteType
}

function Note({ note }: props) {


  const { _id, content } = note
  const { user } = useContext(AuthContext)
  const { dispatch } = useContext(NotesContext)


  const HandleRemove = async () => {
    dispatch({
      type: "REMOVENOTE",
      payload: _id
    })
    DeleteNote(_id, user.token).then(
      error => {
        if (error) {
          dispatch({
            type: "ADDNOTE",
            payload: note
          })
        }
      }
    )
  }
  return (
    <div className='task--container'>
      <div className={`note--title `}>
        <p>{content}</p>
      </div>
      <BiSolidTrashAlt onClick={HandleRemove} />
    </div>
  )
}

export default Note