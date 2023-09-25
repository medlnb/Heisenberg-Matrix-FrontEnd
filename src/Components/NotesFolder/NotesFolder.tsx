import { NoteType } from '../../Models/Models'
import Note from '../Note/Note'
import './NotesFolder.css'

interface props {
  title: string,
  tasksArray: NoteType[]
}

function NotesFolder({ title, tasksArray }: props) {

  return (
    <div className='tasksFolder--container'>
      <h3>{title}</h3>
      {tasksArray.map((note: NoteType, i: number) => {
        return (
          <Note key={`${title}${i}`} note={note} />
        )
      })}
    </div>
  )
}
export default NotesFolder