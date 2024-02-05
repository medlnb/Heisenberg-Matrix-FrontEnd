import { createContext, useContext, useEffect, useReducer } from "react";
import { MatrixTask } from "../Models/Models";
import { MatrixTasksType } from "../Models/Models";
import { AuthContext } from "./UserContext";

interface stateType {
  MatrixTasks: MatrixTasksType;
  checkedMatrixTasks: MatrixTask[];
}

export const MatrixTasksContext = createContext<{
  state: stateType | null;
  dispatch: any;
}>({
  state: {
    MatrixTasks: {
      ImportUrgant: [],
      ImportNotUrgant: [],
      NotImportUrgant: [],
      NotImportNotUrgant: [],
    },
    checkedMatrixTasks: [],
  },
  dispatch: null,
});

export const NoteReducer = (
  state: stateType | null,
  action: {
    type: "SETNOTES" | "ADDNOTE" | "UPDATENOTES" | "REMOVEMATRIXTASK";
    payload: any;
    NoteType: string;
  }
) => {
  switch (action.type) {
    case "SETNOTES":
      return {
        MatrixTasks: action.payload.MatrixTasks,
        checkedMatrixTasks: action.payload.checkedMatrixTasks,
      };

    case "ADDNOTE":
      if (!state) return null;
      const newarray =
        state.MatrixTasks[action.NoteType as keyof MatrixTasksType];
      newarray.push(action.payload);
      return {
        ...state,
        MatrixTasks: { ...state.MatrixTasks, [action.NoteType]: newarray },
      };

    case "UPDATENOTES":
      return { MatrixTasks: action.payload, checkedMatrixTasks: [] };

    case "REMOVEMATRIXTASK":
      if (!state) return null;
      return {
        MatrixTasks: {
          ...state.MatrixTasks,
          [action.payload.newarray.typeName]: action.payload.newarray.content,
        },
        checkedMatrixTasks: [
          ...state.checkedMatrixTasks,
          action.payload.noteSelected,
        ],
      };

    default:
      return state;
  }
};
export const MatrixTasksContextProvider = ({ children }: any) => {
  const { handleUserChange } = useContext(AuthContext);
  const [state, dispatch] = useReducer<React.Reducer<stateType | null, any>>(
    NoteReducer,
    null
  );
  const { user } = useContext(AuthContext);

  const fetchNotes = async () => {
    const response = await fetch(
      "https://heisenberg-matrix-backend.onrender.com/api/MatrixTask",
      {
        headers: {
          authorization: `bearer ${user.token}`,
        },
      }
    );
    const json: MatrixTask[] | { requiredAuth: boolean } =
      await response.json();
    if ("requiredAuth" in json) {
      handleUserChange({
        username: null,
        email: null,
        token: null,
      });
      return;
    }
    const CheckedTasks: MatrixTask[] = [];
    const UncheckedTasks: MatrixTask[] = [];
    json.map((matrixTask) => {
      if (matrixTask.isDone) CheckedTasks.push(matrixTask);
      else {
        UncheckedTasks.push(matrixTask);
      }
    });

    const ImportUrgant: MatrixTask[] = [];
    const ImportNotUrgant: MatrixTask[] = [];
    const NotImportUrgant: MatrixTask[] = [];
    const NotImportNotUrgant: MatrixTask[] = [];
    UncheckedTasks.forEach((note: MatrixTask) => {
      if (note.type === "ImportUrgant") {
        ImportUrgant.push(note);
      } else if (note.type === "ImportNotUrgant") {
        ImportNotUrgant.push(note);
      } else if (note.type === "NotImportUrgant") {
        NotImportUrgant.push(note);
      } else if (note.type === "NotImportNotUrgant") {
        NotImportNotUrgant.push(note);
      }
    });
    const _default = {
      ImportUrgant,
      ImportNotUrgant,
      NotImportUrgant,
      NotImportNotUrgant,
    };

    dispatch({
      type: "SETNOTES",
      payload: {
        MatrixTasks: _default,
        checkedMatrixTasks: CheckedTasks,
      },
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <MatrixTasksContext.Provider value={{ state, dispatch }}>
      {children}
    </MatrixTasksContext.Provider>
  );
};
