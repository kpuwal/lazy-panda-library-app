// import React, { useEffect, useState } from 'react';
// import { RootState, useAppDispatch } from '../../redux/store';
// import { navigate, setNavigationSource } from '../../redux/slices/navigationSlice';
// import { displayBookData } from '../../redux/slices/bookSlice';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { savingBookIsDisabled } from '../../redux/slices/appSlice';
// import { Colours } from '../../styles/constants';
// import { useSelector } from 'react-redux';
// const SPACING = 15;

// const BookItem = React.memo(({ item }: any) => {
//   const dispatch = useAppDispatch();
//   const { bookIsLoaded } = useSelector((state: RootState) => state.book);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   // useEffect(() => {
//   //   if (bookIsLoaded) {
//   //     dispatch(navigate('bookInfo'));
//   //   }
//   // }, [bookIsLoaded, dispatch]);

//   useEffect(() => {
//     // Code that depends on the updated state can be placed here
//     const progressPercentage = progress * 100;

//     if (progressPercentage >= 100) {
//       setLoading(false);

//       setTimeout(() => {
//         dispatch(navigate('bookInfo'));
//       }, 500);
//     }
//   }, [progress]); 

//   const handlePressIn = () => {
//     loadBook();
//   };

//   const loadBook = async () => {
//     // setLoading(true);
//     dispatch(displayBookData(item));
//     dispatch(savingBookIsDisabled(false));
//     dispatch(setNavigationSource('Library'));
  
//     const timer = setInterval(() => {
//       setProgress((prevProgress) => {
//         const newProgress = prevProgress + 0.05; // Increment progress by 1%
//         const clampedProgress = Math.min(newProgress, 1);
  
//         if (clampedProgress >= 1) {
//           clearInterval(timer);
//           // setLoading(false);
  
//           // Introduce a delay before navigation
//           // setTimeout(() => {
//           //   dispatch(navigate('bookInfo'));
//           // }, 500);
  
//           return 1;
//         }
  
//         return clampedProgress;
//       });
//     }, 50);
//   };
  

//   const progressPercentage = progress * 100; // Corrected

//   return (
//     <Pressable
//       onPress={handlePressIn}
//       style={({ pressed }) => [
//         {
//           backgroundColor: pressed ? Colours.action : Colours.primary,
//         },
//       ]}
//     >
//       <View style={styles.container}>
//         <View style={styles.textContainer}>
//           <Text numberOfLines={2} lineBreakMode="tail" style={styles.textTitle}>
//             {item.title}
//           </Text>
//           <Text
//             style={styles.textAuthor}
//             numberOfLines={1}
//             lineBreakMode="tail"
//           >
//             {item.author}
//           </Text>
//         </View>
//         {/* {loading && ( */}
//           <View style={styles.progressBarContainer}>
//             <View
//               style={[
//                 styles.progressBar,
//                 {
//                   width: `${progressPercentage}%`, // Corrected
//                   backgroundColor: Colours.filter,
//                 },
//               ]}
//             />
//           </View>
//         {/* )} */}
//       </View>
//     </Pressable>
//   );
// });

import React, { useEffect, useState, PureComponent } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';  // Import useDispatch
import { RootState, useAppDispatch } from '../../redux/store';
import { navigate, setNavigationSource } from '../../redux/slices/navigationSlice';
import { displayBookData } from '../../redux/slices/bookSlice';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { savingBookIsDisabled } from '../../redux/slices/appSlice';
import { Colours } from '../../styles/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../NavigationStack';

const SPACING = 15;
type Props = NativeStackScreenProps<RootStackParamList, 'Book'>;

interface BookItemProps {
  item: { title: string; author: string }; // Update with actual item type
  navigation: any;
}

interface BookItemState {
  loading: boolean;
  progress: number;
}

class BookItem extends PureComponent<BookItemProps & { dispatch: any, navigation: any }, BookItemState> {
  // Remove the useAppDispatch hook

  constructor(props: BookItemProps & { dispatch: any, navigation: any }) {
    super(props);

    this.state = {
      loading: false,
      progress: 0,
    };
  }

  componentDidUpdate(prevProps: BookItemProps & { dispatch: any , navigation: any}, prevState: BookItemState) {
    const { progress } = this.state;

    const progressPercentage = progress * 100;

    if (progressPercentage >= 100 && prevState.progress !== 1) {
      this.setState({ loading: false });

      setTimeout(() => {
        this.props.navigation.navigate('Book');  // Use dispatch from props
      }, 500);
    }
  }

  handleGoToBook = () => {
    this.props.dispatch(displayBookData(this.props.item));
    this.props.navigation.navigate('Book', { book: this.props.item });
  }

  handlePressIn = () => {
    console.log()
    this.loadBook();
  };

  loadBook = async () => {
    this.setState({ loading: true });
    this.props.dispatch(displayBookData(this.props.item));  // Use dispatch from props
    this.props.dispatch(savingBookIsDisabled(false));
    this.props.dispatch(setNavigationSource('Library'));

    const timer = setInterval(() => {
      this.setState((prevState) => {
        const newProgress = prevState.progress + 0.05;
        const clampedProgress = Math.min(newProgress, 1);

        if (clampedProgress >= 1) {
          clearInterval(timer);
          return { progress: 1 };
        }

        return { progress: clampedProgress };
      });
    }, 50);
  };

  render() {
    const { item } = this.props;
    const { loading, progress } = this.state;

    const progressPercentage = progress * 100;

    return (
      <Pressable
        onPress={this.handleGoToBook}
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
          {loading && (
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: Colours.filter,
                  },
                ]}
              />
            </View>
          )}
        </View>
      </Pressable>
    );
  }
}

const mapDispatchToProps = () => {
  const dispatch = useAppDispatch();

  return {
    displayBookData: (item: any) => dispatch(displayBookData(item)),
    dispatch,
  }
}

export default connect(null, mapDispatchToProps)(BookItem);

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
    fontFamily: 'Courier Prime',
    fontWeight: 'bold',
    fontSize: 22,
  },
  textAuthor: {
    color: '#808080',
    fontFamily: 'Courier Prime',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressBarContainer: {
    marginTop: 5,
    bottom: 0,
    height: 2,
  },
  progressBar: {
    height: 1,
    zIndex: 7,
  },
});
