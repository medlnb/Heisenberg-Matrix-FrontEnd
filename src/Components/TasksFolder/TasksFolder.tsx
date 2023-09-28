import { TaskType } from '../../Models/Models'
import Task from '../Task/Task'
import './TasksFolder.css'

interface props {
  title: string,
  tasksArray: TaskType[],
  color: string
}

function TasksFolder({ title, tasksArray, color }: props) {
  function getRandomNumber() {
    const random = Math.random();

    const randomNumber = random * 15 - 7;

    return randomNumber;
  }
  return (
    <div className='tasksFolder--container' style={{ background: color, transform: `rotate(${getRandomNumber()}deg)` }}>
      <h3>{title}</h3>
      {tasksArray.map((task: TaskType, i: number) => {
        return (
          <Task key={`${title}${i}`} task={task} />
        )
      })}
    </div>
  )
}
export default TasksFolder