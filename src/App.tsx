import "./App.css";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

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
import { Toaster, toast } from "sonner";

export const notify = (
  toastType: "success" | "info" | "warning" | "error",
  toastMsg: string
) => toast[toastType](`${toastMsg}`);

const AuthenticatedRoute: React.FC = () => {
  const { user } = useAuthContext();
  if (!user.username) return <Navigate to="/welcome" replace />;
  return <Outlet />;
};

function App() {
  return (
    <>
      <div className="everythings-black">
        <Toaster richColors />
      </div>
      <div style={{ width: "100%" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/welcome" element={<WelcomePage />}>
              <Route path="" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route
              element={
                <TasksContextProvider>
                  <NotesContextProvider>
                    <MatrixTasksContextProvider>
                      <AuthenticatedRoute />
                    </MatrixTasksContextProvider>
                  </NotesContextProvider>
                </TasksContextProvider>
              }
            >
              <Route path="/" element={<TasksContainer />} />
              <Route path="/notes" element={<NotesContainer />} />
              <Route path="/matrix" element={<MatrixP />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
