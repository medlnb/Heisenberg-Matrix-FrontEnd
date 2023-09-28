import { NoteType } from '../../Models/Models'
import Note from '../Note/Note'
import './NotesFolder.css'

interface props {
  title: string,
  tasksArray: NoteType[],
  color: string
}
function getRandomNumber() {
  const random = Math.random();

  const randomNumber = random * 15 - 7;

  return randomNumber;
}
function NotesFolder({ title, tasksArray, color }: props) {

  return (
    <div className='tasksFolder--container' style={{ background: color, transform: `rotate(${getRandomNumber()}deg)` }}>
      <i className="pin"></i>
      <h3 className='tasksFolder--title'>{title}</h3>
      <div className='tasks'>
        {tasksArray.map((note: NoteType, i: number) => {
          return (
            <Note key={`${title}${i}`} note={note} />
          )
        })}
      </div>
    </div>
  )
}
export default NotesFolder