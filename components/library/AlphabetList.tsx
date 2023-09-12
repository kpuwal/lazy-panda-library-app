import { View, Text, Animated, ActivityIndicator, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity, Pressable, TouchableWithoutFeedback, Dimensions, Easing } from 'react-native';
import { sortAZ } from '../book/infoModules/Icons';
import { useEffect, useRef, useState } from 'react';
const { height } = Dimensions.get('window');

interface AlphabetListProps {
  onLetterPress: (letter: string) => void;
  floatStyles: any,
  alphabet: string[]
}

// const ALPHABET = '129ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const AlphabetList: React.FC<AlphabetListProps> = ({ onLetterPress, floatStyles, alphabet }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);
  const letterScale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (isOpen) {
      // Animate the letters with a spring effect when the menu is opened
      Animated.spring(letterScale, {
        toValue: 1,
        friction: 5, // Adjust the friction as needed
        useNativeDriver: true,
      }).start();
    } else {
      // Reset the scale when the menu is closed
      letterScale.setValue(0.5);
    }
  }, [isOpen]);

  const rotation = {
    transform: [
      {
        rotate: rotateValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg']
        })
      }
    ]
  };

  // const toggleMenu = () => {
  //   const toValue = isOpen ? 0 : 1;

  //   Animated.timing(rotateValue, {
  //     toValue,
  //     duration: 300, // Adjust the duration as needed
  //     easing: Easing.inOut(Easing.ease),
  //     useNativeDriver: true
  //   }).start();

  //   setIsOpen(!isOpen);
  // }


  // const toggleMenu = () => {
  //   const toValue = isOpen ? 0 : 1;

  //   Animated.spring(rotateValue, {
  //     toValue,
  //     friction: 6,
  //     tension: 60,
  //     useNativeDriver: true,
  //   }).start();

  //   setIsOpen(!isOpen);

  //   if (!isOpen) {
  //     // Animate the opacity and scale of each letter sequentially using stagger
  //     Animated.stagger(delay, [
  //       ...letterOpacities.map((opacity) =>
  //         Animated.timing(opacity, {
  //           toValue: 1,
  //           duration,
  //           easing: Easing.inOut(Easing.ease),
  //           useNativeDriver: true,
  //         })
  //       ),
  //       ...letterScales.map((scale) =>
  //         Animated.spring(scale, {
  //           toValue: 1,
  //           friction: 2, // Adjust the spring effect
  //           useNativeDriver: true,
  //         })
  //       ),
  //     ]).start();
  //   }
  // };

  return (
    <View style={[styles.buttonContainer, floatStyles]}>
      <TouchableWithoutFeedback onPress={() => setIsOpen(!isOpen)}>
        <Animated.View style={[styles.button, styles.menu, rotation
            ]}>
          { sortAZ }
        </Animated.View>
      </TouchableWithoutFeedback>
      {isOpen && (
        <ScrollView style={styles.alphabetContainer}>
        {alphabet.map((letter) => (
            <TouchableOpacity 
              onPress={() => onLetterPress(letter)} 
              key={letter}>
              <Animated.View
                style={[
                  styles.alphabetButton,
                  {
                    transform: [{ scale: letterScale }],
                  },
                ]}
              >
                  <Text style={styles.alphabetButtonText}>{letter}</Text>
              </Animated.View>
          </TouchableOpacity>

        ))}
      </ScrollView>
      )}
    </View>
  );
};

export default AlphabetList;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    flex: 1,
  },
  button: {
    // position: 'absolute',
    width: 55,
    height: 35,
    // borderRadius: 20,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#fff',
    // shadowRadius: 8,
    // shadowColor: '#000',
    // shadowOpacity: .2,
    // shadowOffset: {height: 5, width: 0},
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  menu: {

  },
  alphabetContainer: {
    // flex: 1,
    // flexWrap: 'wrap',
    // paddingLeft: 20,
    maxHeight: height * .8, // Add this line to limit the widt
    flexDirection: 'column', 
    // marginBottom: 100
  },
  alphabetButton: {
    paddingVertical: 2.5,
    paddingHorizontal: 2.5,
    marginVertical: 3,
    // backgroundColor: '#505359',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: .4,
    right: 0,
    // borderRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 30,
  },
  alphabetButtonBlk: {
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    margin: 3,
    backgroundColor: 'black',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    // opacity: .7,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    width: 65
  },
  alphabetButton2: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    margin: 3,
  },
  alphabetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
})
