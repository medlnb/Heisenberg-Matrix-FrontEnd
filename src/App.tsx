import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomePage from "./Pages/WelcomePage/WelcomePage";
import MatrixP from "./Pages/MatrixP/MatrixP";
import { MatrixTasksContextProvider } from "./Context/MatrixTaskContext";
import { useAuthContext } from "./Hooks/useAuthContext";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/Signup";
import NotesContainer from "./Components/NotesContainer/NotesContainer";
import TasksContainer from "./Components/TasksContainer/TasksContainer";
import { TasksContextProvider } from "./Context/TaskContext";
import { NotesContextProvider } from "./Context/NoteContext";

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
  return (
    <div style={{ width: "100%" }}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomePage />}>
            <Route path="" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route element={<AuthenticatedRoute />}>
            <Route
              path="/"
              element={
                <TasksContextProvider>
                  <NotesContextProvider>
                    <TasksContainer />
                  </NotesContextProvider>
                </TasksContextProvider>
              }
            />
            <Route
              path="/notes"
              element={
                <TasksContextProvider>
                  <NotesContextProvider>
                    <NotesContainer />
                  </NotesContextProvider>
                </TasksContextProvider>
              }
            />
          </Route>
          <Route
            path="/matrix"
            element={
              <MatrixTasksContextProvider>
                <MatrixP />
              </MatrixTasksContextProvider>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
