import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';  

import Home from '../screens/Home';
import Scanner from '../screens/Scanner';
import AddBookScreen from '../screens/AddBook';

const Navigation = () => {

  const route = useSelector((state: RootState) => state.navigate.route);
  
  switch(route) {
    case 'home':
      return <Home />
    case 'addBook':
      return <AddBookScreen /> 
    case 'scanBook':
      return <Scanner />
    // case 'library':
    //   return <LibraryScreen />
    default:
      return null;
  }

}

export default Navigation;
