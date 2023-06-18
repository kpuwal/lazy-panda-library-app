import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { useSelector } from "react-redux";
import { RootState } from '../../redux/store';

import ScanningGIF from './ScanningGIF';
import Dots from './Dots';

const bg = 'rgba(0, 0, 0, .15)';

const ScannerBackground = () => {
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const bookIsLoaded = useSelector((state: RootState) => state.book.isLoaded);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Fontisto name="shopping-barcode" size={24} color="#9a9a9a" />
        <Text style={styles.header}>ISBN Barcode</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.middleLeft} />
        <View style={styles.middleMiddle} />
        <View style={styles.middleRight} />
      </View>
      <View style={styles.bottom}>
        <View style={styles.infoContainer}>
          {!scanned && <Text style={styles.infoTxt}>Scanning</Text>}
          {scanned || bookIsLoaded ? <Text style={styles.infoTxt}>Loading</Text> : <View />}
          <Dots />
          <ScanningGIF />
        </View>
      </View>
    </View>
  )
}

export default ScannerBackground;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
    position: 'relative'
  },
  top: {
    flexDirection: 'row',
    height: '20%',
    backgroundColor: bg,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: '10%',
    paddingTop: '10%',

  },
  middle: {
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middleLeft: {
    width: '5%',
    backgroundColor: bg,
  },
  middleMiddle: {
    alignSelf: 'center',
    width: '90%',
    height: '100%',
    borderColor: '#9a9a9a',
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  middleRight: {
    width: '5%',
    backgroundColor: bg,
  },
  bottom: {
    height: '40%',
    backgroundColor: bg,
  },
  header: {
    color: '#9a9a9a',
    paddingLeft: 5,
    fontSize: 26,
    fontFamily: 'Courier Prime',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'justify',
  },
  infoTxt: {
    color: '#FFFFFF',
    fontSize: 25,
    bottom: '-2%',
    fontFamily: 'Courier Prime',
  }
})
