import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Tasks from "./Pages/Tasks/Tasks";
import Notes from "./Pages/Notes/Notes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import MatrixP from "./Pages/MatrixP/MatrixP";
import { MatrixTasksContextProvider } from "./Context/MatrixTaskContext";
import Account from "./Components/Account/Account";
import NavBar from "./Components/NavBar/NavBar";
import DateCom from "./Components/DateCom/DateCom";
import CreateNote from "./Components/CreateNote/CreateNote";
import Calendar from "./Components/Calendar/Calendar";
import AddTask from "./Components/AddTask/AddTask";
import { useContext } from "react";
import { NotesContext } from "./Context/NoteContext";
import { TasksContext } from "./Context/TaskContext";
import { useAuthContext } from "./Hooks/useAuthContext";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";

export const notify = (
  toastType: "success" | "info" | "warn" | "error",
  toastMsg: string
) =>
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

const AuthenticatedRoute: React.FC = () => {
  const { user } = useAuthContext();
  if (!user.username) return <Navigate to="/welcome" replace />;
  return <Outlet />;
};

function App() {
  const { state: notesState } = useContext(NotesContext);
  const { state: tasksState } = useContext(TasksContext);
  return (
    <div style={{ width: "100%" }}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />}>
            <Route path="" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="/" element={<AuthenticatedRoute />}>
            <Route
              path="/"
              element={
                <div className="All--container">
                  <div className="right--container">
                    <Account />
                    <NavBar />
                    <DateCom />
                    <Calendar data={tasksState} />
                    <AddTask />
                  </div>
                  <div className="left--container">
                    <Tasks />
                  </div>
                </div>
              }
            />
            <Route
              path="/notes"
              element={
                <div className="All--container">
                  <div className="right--container">
                    <Account />
                    <NavBar />
                    <DateCom />
                    <Calendar data={notesState} />
                    <CreateNote />
                  </div>
                  <div className="left--container">
                    <Notes />
                  </div>
                </div>
              }
            />
            <Route
              path="/matrix"
              element={
                <MatrixTasksContextProvider>
                  <MatrixP />
                </MatrixTasksContextProvider>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
