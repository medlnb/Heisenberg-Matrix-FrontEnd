import './SearchBar.css'
import { FiSearch } from 'react-icons/fi'
function SearchBar() {
  return (
    <div className='searchbar--container'>
      <input
        
        placeholder='Search...' />
      <FiSearch className='scoop' stroke="black" />
    </div >
  )
}

export default SearchBar