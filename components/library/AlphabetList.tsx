import { View, Text, FlatList, ActivityIndicator, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Pressable } from 'react-native';


interface AlphabetListProps {
  onLetterPress: (letter: string) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const AlphabetList: React.FC<AlphabetListProps> = ({ onLetterPress }) => {
  return (
    <View style={styles.alphabetContainer}>
      {ALPHABET.split('').map((letter) => (
        <TouchableOpacity
          key={letter}
          onPress={() => onLetterPress(letter)}
          style={styles.alphabetButton}
        >
          <Text style={styles.alphabetButtonText}>{letter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AlphabetList;

const styles = StyleSheet.create({
  alphabetContainer: {
    flex: 1,
    flexWrap: 'wrap',
    // paddingLeft: 20,
    // maxWidth: '100%', // Add this line to limit the widt
    flexDirection: 'row', // Arrange children horizontally
    // justifyContent: 'center', // Center children horizontally
    // alignItems: 'center', // Center children vertically
    // paddingVertical: 5,
  },
  alphabetButton: {
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    margin: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .7,
    borderRadius: 10,
    width: 65
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
    borderRadius: 10,
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
  },
})
