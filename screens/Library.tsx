import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { readLibrary } from '../redux/slices/bookSlice';

const Library = () => {
  const { library } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fetch the library data when the component mounts
    dispatch(readLibrary());
    // console.log(library)
  }, [dispatch]);

  return (
    <View>
      <Text>Library</Text>
      {/* <ul>
        {library.map((book: any, index: number) => (
          <li key={index}>{book.title}</li>
        ))}
      </ul> */}
    </View>
  );
};

export default Library;
