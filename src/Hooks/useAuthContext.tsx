import { useContext } from 'react';
import { AuthContext } from '../Context/UserContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error(
      "useAuthContext must be usedd within a AuthContextProdiver"
    )
  }
  return context
}