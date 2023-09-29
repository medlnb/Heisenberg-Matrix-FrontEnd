import { useLocation } from 'react-router-dom'
import Account from '../Account/Account'
import Calendar from '../Calendar/Calendar'
import DateCom from '../DateCom/DateCom'
import NavBar from '../NavBar/NavBar'
import AddTask from '../AddTask/AddTask.tsx'
import './Right.css'
import CreateNote from '../CreateNote/CreateNote.tsx'
import { useContext } from 'react'
import { NotesContext } from '../../Context/NoteContext.tsx'
import { TasksContext } from '../../Context/TaskContext.tsx'

function Right() {
  const { state: notesState } = useContext(NotesContext)
  const { state: tasksState } = useContext(TasksContext)
  const { pathname } = useLocation()
  return (
    <div className='right--container'>
      <Account />
      <NavBar />
      {pathname === "/" &&
        <>
          <DateCom />
          <Calendar data={tasksState} />
          <AddTask />
        </>}
      {pathname === "/notes" &&
        <>
          <DateCom />
          <Calendar data={notesState} />
          <CreateNote />

        </>}

    </div >
  )
}

export default Right