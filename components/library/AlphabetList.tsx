import { View, Text, Animated, ActivityIndicator, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity, Pressable, TouchableWithoutFeedback, Dimensions, Easing } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface AlphabetListProps {
  onLetterPress: (letter: string) => void;
  floatStyles: any,
  alphabet: string[],
  isActive?: boolean
}

// const ALPHABET = '129ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const AlphabetList: React.FC<AlphabetListProps> = ({ onLetterPress, floatStyles, alphabet, isActive }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);
  const letterScale = useRef(new Animated.Value(0.5)).current;
  const closingAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
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
  }, [isOpen]);

  // const rotation = {
  //   transform: [
  //     {
  //       rotate: rotateValue.interpolate({
  //         inputRange: [0, 1],
  //         outputRange: ['0deg', '180deg']
  //       })
  //     }
  //   ]
  // };

  return (
    <View style={[styles.buttonContainer, floatStyles]}>
      <Pressable onPress={() => setIsOpen(!isOpen)} disabled={!isActive}>
        <Animated.View style={[
          styles.button,
          {backgroundColor: isOpen ? 'black' : 'white'}]}>
          {isOpen ? 
            <MaterialCommunityIcons name="sort-alphabetical-ascending" size={20} color="white" /> : 
            <MaterialCommunityIcons name="sort-alphabetical-ascending" size={24} color={isActive ? "black" : "white"} />}
        </Animated.View>
      </Pressable>
      {isOpen && (
        <ScrollView
          style={styles.alphabetContainer}
          showsVerticalScrollIndicator={false}>
        {alphabet.map((letter) => (
            <TouchableOpacity 
              onPress={() => onLetterPress(letter)} 
              key={letter}>
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
    maxHeight: height * .8, // Add this line to limit the widt
    flexDirection: 'column', 
    marginTop: 30
  },
  alphabetButton: {
    paddingVertical: 2.5,
    paddingHorizontal: 2.5,
    marginVertical: 3,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    width: 25,
  },
  alphabetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily:  'Courier Prime',

  },
})
