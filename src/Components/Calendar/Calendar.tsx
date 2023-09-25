import { useContext } from 'react';
import './Calendar.css'
import { DateContext } from '../../Context/DateContext';
import { MatrixTasksType } from '../../Models/Models';

function Calendar() {
  const { date, ChangeDate } = useContext(DateContext)
  const daysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const emptyDays = () => {
    const selecteddate = new Date(date.year, date.month - 1, 1)
    const day_1 = selecteddate.toString().substring(0, 3)
    const index = daysName.findIndex((day) => day === day_1);
    return index
  }
  function getDaysInMonth() {
    const newdate = new Date(date.year, date.month, 1);

    newdate.setDate(0);

    return newdate.getDate();
  }
  getDaysInMonth()
  emptyDays()
  const days = []
  for (let index = 1; index <= emptyDays(); index++)
    days.push("")
  for (let index = 1; index <= getDaysInMonth(); index++)
    days.push(index)
  return (
    <div className='calendar--container'>
      <div className='celendar--daysName'>
        {daysName.map((day, index) => (
          <div key={index}  >
            <p>{day}</p>
          </div>
        ))}
      </div>
      <div className='calendar--days'>
        {days.map((day, index) => (
          <div
            key={index}
            className={day == "" ? "" : `${date.day == day  ? "days selected--day" : "days"}`}
            onClick={() => ChangeDate((prev: MatrixTasksType) => {
              return { ...prev, day }
            })}
          >
            <p >{day}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar