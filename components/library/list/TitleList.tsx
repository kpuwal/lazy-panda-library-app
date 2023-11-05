import { RootState } from '@reduxStates/index';
import { useSelector } from 'react-redux';
import SectionsList from './Sections';

const TitleList = () => {
  const { librarySortedByTitle } = useSelector((state: RootState) => state.library);

  return <SectionsList data={librarySortedByTitle.data} />
}

export default TitleList;
