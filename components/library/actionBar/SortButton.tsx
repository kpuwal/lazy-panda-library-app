import { Colours, Fonts } from "@styles/constants";
import { Text, Pressable, StyleSheet } from "react-native";

type SortButtonTypes = {
  label: string,
  active: boolean,
  onPress: () => void
}

const SortButton = ({ label, active, onPress }: SortButtonTypes) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.sortButton,
        active ? styles.bgBlack : styles.bgWhite,
      ]}
    >
      <Text style={[active ? styles.white : styles.black, styles.sortButtonText]}>
        {label}
      </Text>
    </Pressable>
  );
};

export default SortButton;

const styles = StyleSheet.create({
  sortButton: {
    paddingVertical: 2.5,
    paddingHorizontal: 2.5,
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    width: 60,
  },
  sortButtonText: {
    fontSize: Fonts.small,
    fontWeight: 'bold',
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