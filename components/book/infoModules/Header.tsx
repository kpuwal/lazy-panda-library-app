import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderTypes = {
  handleClose: any,
  isDisabled: boolean,
}

const Header = ({handleClose, isDisabled}: HeaderTypes) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleClose} style={styles.backButton}>
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </Pressable>
        <View style={styles.headerIcons}>
          <Image 
            source={require('./../../../assets/book.png')}  
            style={{ width: 30, height: 30 }}
          />
          <Text style={styles.infoLabel}>Book Details</Text>
        </View>
      </View>
      <View style={styles.alertContainer}>
        {isDisabled && (
          <View style={styles.alertRow}>
            <MaterialCommunityIcons name="alert-octagon" size={14} color="red" />
            <Text style={styles.alert}>The Book Has Been Successfully Saved!</Text>
          </View>)}
      </View>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  alertContainer: {
    height: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButton: {
    flex: 1, // Take up 10% of the available space
    alignItems: 'flex-start',
    marginRight: 10
  },
  headerIcons: {
    flex: 9, // Take up 90% of the available space
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoLabel: {
    left: 8,
    fontSize: 28,
    fontFamily: 'Courier Prime',
  },
  alertRow: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  alert: {
    color: 'red',
    fontFamily: 'Courier Prime',
    fontSize: 12,
    paddingLeft: 5,
  }
})
