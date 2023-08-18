import ScannerBG from './ScannerBG';
import LoadingDots from './LoadingDots';
import { View, StyleSheet } from 'react-native';

const ScannerOverlay = () => {
  return (
    <>
      <View style={styles.container}>
        <ScannerBG />
      </View>
      <View style={styles.container}>
        <View style={styles.box1}></View>
        <View style={styles.box2}></View>
        <View style={styles.box3}><LoadingDots /></View>
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
    backgroundColor: 'red',
  },
  box2: {
    flex: 40, // 60% height
    backgroundColor: 'green',
  },
  box3: {
    flex: 40, // 20% height
  },
})