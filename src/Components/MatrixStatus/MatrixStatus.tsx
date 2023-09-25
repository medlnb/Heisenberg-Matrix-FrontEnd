import { useContext, useState } from 'react'
import './MatrixStatus.css'
import { MatrixTasksContext } from '../../Context/MatrixTaskContext'
import { MatrixTask } from '../../Models/Models'
import { MdDoneOutline } from "react-icons/md"
import { BiTask } from "react-icons/bi"

function MatrixStatus() {
  const { state } = useContext(MatrixTasksContext)
  const [showStatus, setShowStatus] = useState({
    tasksDone: false,
    TodayTask: true
  })
  const TasksCheckedToday: MatrixTask[] = []
  if (!state.checkedMatrixTasks)
    return

  const IsToday = (dateString: string) => {
    const inputDate = new Date(dateString);

    const currentDate = new Date();

    return inputDate.getFullYear() === currentDate.getFullYear() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getDate() === currentDate.getDate();
  }

  const TasksCheckedTodayTitles: JSX.Element[] = []
  state.checkedMatrixTasks.map((checkedMatrixTask, i) => {
    if (IsToday(checkedMatrixTask.updatedAt)) {
      TasksCheckedToday.push(checkedMatrixTask)
      TasksCheckedTodayTitles.push(
        <div key={i} className="status inside--status">
          <p className='inside--status--title'>{checkedMatrixTask.title}</p>
        </div>
      )
    }
  })
  const TasksCounter = {
    ImportUrgant: state.MatrixTasks.ImportUrgant.length,
    ImportNotUrgant: state.MatrixTasks.ImportNotUrgant.length,
    NotImportUrgant: state.MatrixTasks.NotImportUrgant.length,
    NotImportNotUrgant: state.MatrixTasks.NotImportNotUrgant.length
  }


  return (
    <div className='matrixStatus--container'>
      <div
        className="status"
        onClick={() => { setShowStatus(prev => ({ ...prev, tasksDone: !prev.tasksDone })) }}
        style={{ cursor: "pointer" }}>
        <div className='left--status'>
          <MdDoneOutline />
          <p>Tasked Finished Today </p>
        </div>
        <p> {TasksCheckedToday.length}</p>
      </div>
      {showStatus.tasksDone &&
        TasksCheckedTodayTitles
      }

      <div
        className="status"
        onClick={() => { setShowStatus(prev => ({ ...prev, TodayTask: !prev.TodayTask })) }}
        style={{ cursor: "pointer" }}>
        <div className='left--status'>
          <BiTask />
          <p>Tasked For Today : </p>
        </div>
        <p>{TasksCounter.ImportNotUrgant + TasksCounter.ImportUrgant + TasksCounter.NotImportNotUrgant + TasksCounter.NotImportUrgant}</p>
      </div>
      {showStatus.TodayTask && <>
        <div className="status inside--status">
          <p className='inside--status--title'>Important & Urgent </p>
          <p className='inside--status'> {TasksCounter.ImportUrgant}</p>
        </div>
        <div className="status inside--status">
          <p className='inside--status--title'>Not Important & Urgent </p>
          <p> {TasksCounter.NotImportUrgant}</p>
        </div>
        <div className="status inside--status">
          <p className='inside--status--title'>Important & Not Urgent </p>
          <p> {TasksCounter.ImportNotUrgant}</p>
        </div>
        <div className="status inside--status">
          <p className='inside--status--title'>Not Important & Not Urgent </p>
          <p>{TasksCounter.NotImportNotUrgant}</p>
        </div>
      </>}

    </div>
  )
}

export default MatrixStatus