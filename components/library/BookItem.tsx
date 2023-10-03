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

  // useEffect(() => {
  //   if (bookIsLoaded) {
  //     dispatch(navigate('bookInfo'));
  //   }
  // }, [bookIsLoaded, dispatch]);

  useEffect(() => {
    // Code that depends on the updated state can be placed here
    const progressPercentage = progress * 100;

    if (progressPercentage >= 100) {
      setLoading(false);

      setTimeout(() => {
        dispatch(navigate('bookInfo'));
      }, 500);
    }
  }, [progress]); 

  const handlePressIn = () => {
    loadBook();
  };

  const loadBook = async () => {
    // setLoading(true);
    dispatch(displayBookData(item));
    dispatch(savingBookIsDisabled(false));
    dispatch(setNavigationSource('Library'));
  
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.05; // Increment progress by 1%
        const clampedProgress = Math.min(newProgress, 1);
  
        if (clampedProgress >= 1) {
          clearInterval(timer);
          // setLoading(false);
  
          // Introduce a delay before navigation
          // setTimeout(() => {
          //   dispatch(navigate('bookInfo'));
          // }, 500);
  
          return 1;
        }
  
        return clampedProgress;
      });
    }, 50);
  };
  

  const progressPercentage = progress * 100; // Corrected

  return (
    <Pressable
      onPress={handlePressIn}
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? Colours.action : Colours.primary,
        },
      ]}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text numberOfLines={2} lineBreakMode="tail" style={styles.textTitle}>
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
        {/* {loading && ( */}
          <View style={styles.progressBarContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${progressPercentage}%`, // Corrected
                  backgroundColor: Colours.filter,
                },
              ]}
            />
          </View>
        {/* )} */}
      </View>
    </Pressable>
  );
});


export default BookItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: SPACING,
    height: 90,
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
    // position: 'absolute',
    bottom: 0,
    // left: 15,
    // right: 0,
    // backgroundColor: 'pink',
    height: 2,
  },
  progressBar: {
    height: 1,
    // marginTop: '5%',
    // backgroundColor: Colours.filter,
    zIndex: 7
  },
})
