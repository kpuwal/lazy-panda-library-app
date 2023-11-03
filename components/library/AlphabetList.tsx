import { View, Text, Animated, ActivityIndicator, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity, Pressable, TouchableWithoutFeedback, Dimensions, Easing } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { Colours } from '@styles/constants';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxStates/index';

const { height } = Dimensions.get('window');

interface AlphabetListProps {
  onLetterPress: (letter: string) => void;
  floatStyles: any
}

const AlphabetList: React.FC<AlphabetListProps> = ({ onLetterPress, floatStyles }) => {
  const { alphabet } = useSelector((state: RootState) => state.library);
  const { isAlphabetListActive } = useSelector((state: RootState) => state.app);

  const rotateValue = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);
  const letterScale = useRef(new Animated.Value(0.5)).current;
  const closingAnimation = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    return () => {
      // Clean up animation values when the component unmounts
      letterScale.setValue(0.5);
      closingAnimation.setValue(0);
    };
  }, []);

  useEffect(() => {
    if (isAlphabetListActive) {
      // setIsOpen(false);
      if (isOpen) {
        // Animate the letters with a spring effect when the menu is opened
        Animated.spring(letterScale, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }).start();
      } else {
        // Start the closing animation
        Animated.spring(closingAnimation, {
          toValue: 0, // Set it to your desired closing scale value
          friction: 8,
          useNativeDriver: true,
        }).start();
      }
    }
  }, [isOpen, isAlphabetListActive]);

  return (
    <View style={[styles.buttonContainer, floatStyles]}>
      
      {isAlphabetListActive && <Pressable onPress={() => setIsOpen(!isOpen)}>
        <View
          style={[
            styles.button,
            { 
              backgroundColor: isOpen ? Colours.secondary : Colours.primary
            },
          ]}
        >
          {isOpen ? 
            <MaterialCommunityIcons name="sort-alphabetical-ascending" size={20} color={Colours.primary} />
           : 
            <MaterialCommunityIcons
              name="sort-alphabetical-ascending"
              size={24}
              color={isAlphabetListActive ? Colours.secondary : Colours.primary}
            />
          }
        </View>
      </Pressable>}
      {isOpen && isAlphabetListActive && (
        <ScrollView style={styles.alphabetContainer} showsVerticalScrollIndicator={false}>
          {alphabet.map((letter) => (
            <TouchableOpacity onPress={() => onLetterPress(letter)} key={letter}>
              <Animated.View
                style={[
                  styles.alphabetButton,
                  {
                    transform: [{ scale: isOpen ? letterScale : closingAnimation }],
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
    width: 45,
    height: 25,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  alphabetContainer: {
    maxHeight: height * .7, // Add this line to limit the widt
    flexDirection: 'column', 
    marginTop: 90,
    position: 'absolute',

  },
  alphabetButton: {
    paddingVertical: 2.5,
    paddingHorizontal: 2.5,
    marginVertical: 3,
    backgroundColor: Colours.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 30,
    height: 25
  },
  alphabetButtonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily:  'Courier Prime',

  },
})
