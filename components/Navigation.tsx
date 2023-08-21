import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';  

import Home from '../screens/Home';
import Scanner from '../screens/Scanner';
import AddBook from '../screens/AddBook';
import Library from '../screens/Library';
import BookInfo from './book/BookInfo';

const Navigation = () => {

  const route = useSelector((state: RootState) => state.navigate.route);
  
  switch(route) {
    case 'home':
      return <Home />
    case 'addBook':
      return <AddBook /> 
    case 'scanBook':
      return <Scanner />
    case 'bookInfo':
      return <BookInfo/>
    case 'library':
      return <Library />
    default:
      return null;
  }

}

export default Navigation;
