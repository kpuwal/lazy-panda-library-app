import { Colours, Fonts } from "@styles/constants";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

type SortButtonTypes = {
  label: string,
  active: boolean,
  onPress: () => void
}

const SortButton = ({ label, active, onPress }: SortButtonTypes) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.sortButton,
        active ? styles.bgBlack : styles.bgWhite,
      ]}
    >
      <Text style={[active ? styles.white : styles.black, styles.sortButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default SortButton;

const styles = StyleSheet.create({
  sortButton: {
    paddingVertical: 2,
    paddingHorizontal: 2,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 60,
  },
  sortButtonText: {
    fontSize: Fonts.small,
    fontFamily:  'Courier Prime',
  },
  white: {
    color: 'white'
  },
  bgWhite: {
    backgroundColor: 'white',
    borderColor: Colours.secondary,
    borderWidth: .5
  },
  black: {
    color: Colours.secondary
  },
  bgBlack: {
    backgroundColor: Colours.secondary
  },
})