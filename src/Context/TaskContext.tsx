import { createContext, useContext, useEffect, useReducer } from "react";
import { TaskType } from "../Models/Models";
import { AuthContext } from "./UserContext";

export const TasksContext = createContext<{
  state: TaskType[] | null;
  dispatch: any | null;
}>({
  state: null,
  dispatch: null,
});
export const NoteReducer = (
  state: TaskType[] | null,
  action: {
    type: "SETTASKS" | "ADDTASK" | "UPDATETASK" | "CHECKTASK" | "REMOVETASK";
    payload: any;
  }
) => {
  switch (action.type) {
    case "SETTASKS":
      return action.payload;

    case "ADDTASK":
      return state ? [...state, action.payload] : [action.payload];

    case "UPDATETASK":
      return action.payload;

    case "CHECKTASK":
      if (!state) return;
      return state.map((task) => {
        if (task._id == action.payload)
          return { ...task, checked: !task.checked };
        else return task;
      });

    case "REMOVETASK":
      if (!state) return;
      return state.filter((task) => task._id !== action.payload);
    default:
      return state;
  }
};
export const TasksContextProvider = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer<React.Reducer<TaskType[] | null, any>>(
    NoteReducer,
    null
  );

  const fetchNotes = async () => {
    const response = await fetch(
      `https://heisenberg-matrix-back-end.vercel.app/api/tasks`,
      {
        headers: {
          authorization: `bearer ${user.token}`,
        },
      }
    );
    const json: TaskType[] = await response.json();
    dispatch({
      type: "SETTASKS",
      payload: json,
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <TasksContext.Provider value={{ state, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
};
