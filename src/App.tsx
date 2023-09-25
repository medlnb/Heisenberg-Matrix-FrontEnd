import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import SearchBar from './Components/SearchBar/SearchBar'
import Right from './Components/Right/Right'
import { DateContextProvider } from './Context/DateContext'
import Tasks from './Pages/Tasks/Tasks'
import Notes from './Pages/Notes/Notes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WelcomePage from './Pages/WelcomePage/WelcomePage'
import { TasksContextProvider } from './Context/TaskContext'
import { NotesContextProvider } from './Context/NoteContext'
import MatrixP from './Pages/MatrixP/MatrixP'
import { MatrixTasksContextProvider } from './Context/MatrixTaskContext'

export const notify = (toastType: "success" | "info" | "warn" | "error", toastMsg: string) =>
  toast[toastType](`${toastMsg}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

function App() {
  return (
    <div style={{ width: "100%" }}>
      <ToastContainer />
      <BrowserRouter>

        <Routes>
          <Route path="/" element={
            <DateContextProvider>
              <TasksContextProvider>
                <div className='All--container'>
                  <Right />
                  <div className='left--container'>
                    {/* <SearchBar /> */}
                    <Tasks />
                  </div>

                </div>
              </TasksContextProvider>
            </DateContextProvider>
          } />
          <Route path="/notes" element={
            <DateContextProvider>
              <NotesContextProvider>
                <div className='All--container'>
                  <Right />
                  <div className='left--container'>
                    {/* <SearchBar /> */}
                    <Notes />
                  </div>

                </div>
              </NotesContextProvider>
            </DateContextProvider>
          } />
          <Route path="/matrix" element={
            <MatrixTasksContextProvider>
              <MatrixP />
            </MatrixTasksContextProvider>
          } />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>

      </BrowserRouter>
    </div >
  )
}

export default App
