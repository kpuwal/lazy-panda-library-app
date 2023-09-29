import React, { useEffect, useState } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { navigate, setNavigationSource } from '../../redux/slices/navigationSlice';
import { displayBookData } from '../../redux/slices/bookSlice';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { savingBookIsDisabled } from '../../redux/slices/appSlice';
import { Colours } from '../../styles/constants';
import { useSelector } from 'react-redux';
const SPACING = 15;

const BookItem = React.memo(({ item }: any) => {
  const dispatch = useAppDispatch();
  const { bookIsLoaded } = useSelector((state: RootState) => state.book);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handlePressIn = () => {
    loadBook();
  };

  // useEffect(() => {console.log('render', bookIsLoaded)}, [])

  // const handlePressOut = () => {
  //   if (!loading) {
  //     // Only trigger navigation if not loading
  //     dispatch(setNavigationSource('Library'));
  //     dispatch(displayBookData(item));
  //     dispatch(savingBookIsDisabled(false));
  //     dispatch(navigate('bookInfo'));
  //   }
  // };

  useEffect(() => {
    if (bookIsLoaded) {
      dispatch(navigate('bookInfo'));
    }
  }, [bookIsLoaded]);

  const loadBook = () => {
    setLoading(true);
    dispatch(displayBookData(item));
    dispatch(savingBookIsDisabled(false));
    dispatch(setNavigationSource('Library'));

    // Simulate loading progress with a timer (replace with your actual loading logic)
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.05; // Increment progress by 1%
        if (newProgress >= 1) {
          clearInterval(timer);
          setLoading(false);

          // dispatch(setBookIsLoaded(false)); // Set loading to false when loading is complete
          // Trigger navigation here
          // if (bookIsLoaded) {
          //   dispatch(navigate('bookInfo'));
          // }
          return 1;
        }
        return newProgress;
      });
    }, 50);
  };


  // const handleBookPress = () => {
  //   if (loading) {
  //     // Don't trigger the action again if a book is already loading
  //     return;
  //   }
  //   loadBook();
  //   dispatch(setNavigationSource('Library'));
  //   dispatch(displayBookData(item));
  //   dispatch(savingBookIsDisabled(false));
  //   dispatch(navigate('bookInfo'));
  // };

  return (
    <Pressable
      onPress={handlePressIn}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? Colours.action : Colours.primary
        }
      ]}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text
            numberOfLines={2}
            lineBreakMode="tail" 
            style={styles.textTitle}
          >
              {item.title}
          </Text>
          <Text
            style={styles.textAuthor}
            numberOfLines={1}
            lineBreakMode="tail" 
          >
            {item.author}
          </Text>
        </View>
        {loading && (
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progress * 100}%`,
                  backgroundColor: Colours.filter,
                },
              ]}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
});

export default BookItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: SPACING,
    height: 80,
    width: '100%',
  },
  textContainer: {
    maxWidth: '96%',
  },
  textTitle: {
    color: Colours.secondary,
    fontFamily:  'Courier Prime',
    fontWeight: 'bold',
    fontSize: 22,
  },
  textAuthor: {
    color: '#808080',
    fontFamily:  'Courier Prime',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 2,
    left: 15,
    right: 0,
    // backgroundColor: Colours.primary,
    height: 3,
  },
  progressBar: {
    height: 1,
    backgroundColor: Colours.filter,
  },
})
