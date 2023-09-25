import './DateCom.css'
import { useContext } from 'react'
import { DateContext } from '../../Context/DateContext'
import { DateType } from '../../Models/Models';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

function DateCom() {
  const todaydate = new Date()

  const { date, ChangeDate } = useContext(DateContext)
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ]

  const HandleIncreaseMonth = () => {
    ChangeDate((prev: DateType) => {
      if (prev.month == 12)
        return { ...prev }
      return { ...prev, month: prev.month + 1, day: 1 }
    })
  }
  const HandleDecreaseMonth = () => {
    ChangeDate((prev: DateType) => {
      if (prev.month == 1)
        return { ...prev }
      return { ...prev, month: prev.month - 1, day: 1 }
    })
  }
  const years = []
  for (let yearIndex = todaydate.getFullYear() - 10; yearIndex < todaydate.getFullYear() + 20; yearIndex++)
    years.push(yearIndex)
  return (
    <div className="date">
      <div className='month'>
        <button
          className='month--button'
          onClick={() => HandleDecreaseMonth()}
        >
          <MdArrowBackIosNew />
        </button>
        <p>{months[date.month - 1]}</p>
        <button
          className='month--button'
          onClick={() => HandleIncreaseMonth()}
        >
          <MdArrowForwardIos />
        </button>
      </div>
      <div className='year'>
        <select
          id="selectMonth"
          name="month"
          value={date.year}
          onChange={(e) => {
            ChangeDate((prev: DateType) => ({ ...prev, year: e.target.value }))
          }}
        >
          {years.map((year, index) => (<option key={index} value={year}>{year}</option>))}
        </select>
      </div>
    </div>
  )
}

export default DateCom