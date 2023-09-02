import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type BottomMenuTypes = {
  handleScan: any,
  handleSave: any,
  disabled: boolean,
}

const BottomMenu = ({disabled, handleScan, handleSave}: BottomMenuTypes) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonSet}>
        <Pressable
          style={styles.button}
          onPress={handleScan}
        >
          <>
            <Text style={styles.buttonLabel}>Back</Text>
            <MaterialCommunityIcons name="repeat" size={15} color="#ffffff" />
          </>
        </Pressable>
        <Pressable
          style={disabled ? [styles.button, styles.disabledButton] : styles.button}
          onPress={handleSave}
          {...{disabled}}
        >
          <Text style={styles.buttonLabel}>Save</Text>
          <MaterialCommunityIcons name="database-plus" size={15} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  )
}

export default BottomMenu;

const styles = StyleSheet.create({
  container: {
    height: '10%',
    backgroundColor: '#fff',
    // opacity: .2,
  },
  buttonSet: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#000',

    // borderWidth: .8,
    // borderColor: '#000000',
    // borderStyle: 'dashed',
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    paddingHorizontal: 3,
  },
  disabledButton: {
    backgroundColor: '#9d9d9d',
  },
});
