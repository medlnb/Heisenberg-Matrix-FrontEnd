import { useLocation } from 'react-router-dom'
import Account from '../Account/Account'
import Calendar from '../Calendar/Calendar'
import DateCom from '../DateCom/DateCom'
import NavBar from '../NavBar/NavBar'
import AddTask from '../AddTask/AddTask.tsx'
import './Right.css'
import CreateNote from '../CreateNote/CreateNote.tsx'

function Right() {
  const { pathname } = useLocation()
  return (
    <div className='right--container'>
      <Account />
      <NavBar />
      {pathname === "/" &&
        <>
          <DateCom />
          <Calendar />
          <AddTask />
        </>}
      {pathname === "/notes" &&
        <>
          <DateCom />
          <Calendar />
          <CreateNote />

        </>}

    </div >
  )
}

export default Right