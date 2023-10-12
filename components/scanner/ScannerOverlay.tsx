import ScannerBG from './ScannerBG';
import LoadingDots from './LoadingDots';
import ScanningGIF from './ScanningGIF';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import { isScanned } from '../../redux/slices/appSlice';
import { navigate } from '../../redux/slices/navigationSlice';
import { StatusBar } from 'expo-status-bar';

import { headerInfoContainer } from '../../styles/styles';
import Header from '../header/Header';
import { MaterialIcons } from '@expo/vector-icons';
import { Colours } from '../../styles/constants';

const ScannerOverlay = () => {
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const { bookIsLoaded, bookError } = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bookError !== '') {
      alert(bookError);
      dispatch(isScanned(false));
    }
  },[bookError])

  const handleClose = () => {
    dispatch(navigate('home'));
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ScannerBG />
      </View>
      <View style={styles.container}>
        <View style={styles.box1} />
        <View style={styles.box2} />
        <View style={styles.box3}>
          <View style={styles.box31}>
            {scanned && !bookIsLoaded && <Text style={styles.infoTxt}>Loading</Text>}
            {!scanned && <Text style={styles.infoTxt}>Scanning</Text>}
            <LoadingDots />
          </View>
          <View style={styles.box32}>
            <Pressable onPress={() => dispatch(navigate('home'))}>
              <ScanningGIF />
            </Pressable>
          </View>          
        </View>
      </View>
    </>
  )
}

export default ScannerOverlay;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box1: {
    flex: 20, // 20% height
    // backgroundColor: 'pink',
    paddingHorizontal: 15,
    width: '100%'
  },
  box2: {
    flex: 40, // 60% height
  },
  box3: {
    flex: 40, // 20% height
  },
  box31: {
    flex: 8,
    flexDirection: 'row',
    top: '-10%'
  },
  box32: {
    flex: 50,
  },
  infoTxt: {
    color: '#FFFFFF',
    fontSize: 25,
    marginRight: 5,
    fontFamily: 'Courier Prime',
  },
  headerGoBackContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
  }
})