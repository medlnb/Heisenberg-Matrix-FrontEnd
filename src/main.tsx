import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthContextProvider } from "./Context/UserContext.tsx";
import { DateContextProvider } from "./Context/DateContext.tsx";
import { TasksContextProvider } from "./Context/TaskContext.tsx";
import { NotesContextProvider } from "./Context/NoteContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <DateContextProvider>
      <TasksContextProvider>
        <NotesContextProvider>
          <App />
        </NotesContextProvider>
      </TasksContextProvider>
    </DateContextProvider>
  </AuthContextProvider>
);
