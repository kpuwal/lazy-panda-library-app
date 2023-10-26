import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import { StatusBar } from 'expo-status-bar';
import { RootState } from '@reduxStates/index';
import ScannerBG from './ScannerBG';
import LoadingDots from './LoadingDots';
import ScanningGIF from './ScanningGIF';


const ScannerOverlay = () => {
  const { scanned } = useSelector((state: RootState) => state.app);
  const { bookIsLoaded } = useSelector((state: RootState) => state.book);

  return (
    <>
      <StatusBar style="light" />
      <ScannerBG />
      <View style={styles.container}>
        <View style={styles.box1} />
        <View style={styles.box2} />
        <View style={styles.box3}>
          <View style={styles.box31}>
            {scanned && !bookIsLoaded && 
              <Text style={styles.infoTxt}>Loading</Text>
            }
            {!scanned && 
              <Text style={styles.infoTxt}>Scanning</Text>
            }
            <LoadingDots colour={'white'} />
          </View>
          <View style={styles.box32}>
            <ScanningGIF />
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
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  box1: {
    flex: 20, // 20% height
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
    flexDirection: 'row'
  }
})