import { createContext, useContext, useEffect, useReducer } from "react";
import { NoteType } from "../Models/Models";
import { AuthContext } from "./UserContext";

export const NotesContext = createContext<{
  state: NoteType[] | null;
  dispatch: any;
}>({
  state: null,
  dispatch: null,
});
export const NoteReducer = (
  state: NoteType[] | null,
  action: {
    type: "SETNOTES" | "ADDNOTE" | "REMOVENOTE";
    payload: any;
  }
) => {
  switch (action.type) {
    case "SETNOTES":
      return action.payload;

    case "ADDNOTE":
      return state ? [...state, action.payload] : [action.payload];

    case "REMOVENOTE":
      if (!state) return;
      return state.filter((note) => note._id !== action.payload);
    default:
      return state;
  }
};
export const NotesContextProvider = ({ children }: any) => {
  const { user } = useContext(AuthContext);

  const [state, dispatch] = useReducer<React.Reducer<NoteType[] | null, any>>(
    NoteReducer,
    null
  );

  const fetchNotes = async () => {
    const response = await fetch(
      `https://heisenberg-matrix-back-end.vercel.app/api/notes`,
      {
        headers: {
          authorization: `bearer ${user.token}`,
        },
      }
    );
    const json: NoteType[] = await response.json();
    dispatch({
      type: "SETNOTES",
      payload: json,
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
