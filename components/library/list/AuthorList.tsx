import { RootState } from '@reduxStates/index';
import { useSelector } from 'react-redux';
import SectionsList from './Sections';

const AuthorList = () => {
  const { librarySortedByAuthor } = useSelector((state: RootState) => state.library);

  return <SectionsList data={librarySortedByAuthor.data} />
}

export default AuthorList;
