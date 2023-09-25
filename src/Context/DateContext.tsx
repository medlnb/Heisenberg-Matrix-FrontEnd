import { createContext, useState } from "react";
import { DateType } from "../Models/Models";

const todayDate = new Date()
const todayDay = todayDate.getDate()
const todayMonth = todayDate.getMonth() + 1
const todayYear = todayDate.getFullYear()

const dayName = todayDate.toLocaleDateString('en-US', { weekday: 'long' }).substring(0, 3);

export const DateContext = createContext<{ date: DateType, ChangeDate: any }>({
  date: {
    dayName,
    day: todayDay,
    month: todayMonth,
    year: todayYear
  },
  ChangeDate: null
})
export const DateContextProvider = ({ children }: any) => {
  const [date, ChangeDate] = useState<DateType>({
    dayName,
    day: todayDay,
    month: todayMonth,
    year: todayYear
  })
  // console.log(date)
  return (
    <DateContext.Provider value={{ date, ChangeDate }}>
      {children}
    </DateContext.Provider>
  )
}