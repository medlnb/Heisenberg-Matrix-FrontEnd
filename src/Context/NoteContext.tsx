import { createContext, useContext, useEffect, useReducer } from "react";
import { NoteType } from "../Models/Models";
import { AuthContext } from "./UserContext";


export const NotesContext = createContext<{ state: NoteType[] | null, dispatch: any | null }>({
  state: null,
  dispatch: null
})
export const NoteReducer = (state: NoteType[], action: any) => {
  switch (action.type) {
    case "SETNOTES":
      return action.payload

    case "ADDNOTE":
      return [...state, action.payload];

    case "REMOVENOTE":
      return state.filter(note => note._id !== action.payload)
    default:
      return state
  }
}
export const NotesContextProvider = ({ children }: any) => {
  const { user } = useContext(AuthContext)
  const default_Notes = [{
    content: "",
    date: {
      dayName: "",
      day: 0,
      month: 0,
      year: 0
    },
    folder: ""
  }]
  const [state, dispatch] = useReducer<React.Reducer<NoteType[], any>>(NoteReducer, default_Notes)


  const fetchNotes = async () => {
    const response = await fetch(`https://heisenberg-matrix-backend.onrender.com/api/notes`, {
      headers: {
        "authorization": `bearer ${user.token}`
      }
    })
    const json: NoteType[] = await response.json();
    dispatch({
      type: "SETNOTES",
      payload: json
    })
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return (
    <NotesContext.Provider value={{ state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
}
