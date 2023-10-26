import { View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoadingDots from '../scanner/scannerModules/LoadingDots';
import { randomLibraryIsLoadingMessage } from '@helpers/constants';

const LibraryLoader = () => {
  return (
    <View 
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <StatusBar style="dark" />
      <Image 
          source={require('../../assets/panda_reading.png')}
          style={{paddingTop: 10, width: 60, height: 60}}
        />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{padding: 20, fontFamily: 'Courier Prime Bold', fontSize: 21}}>Library is loading</Text>
        <LoadingDots colour={'black'} />
      </View>
      <Text style={{padding: 30, fontFamily: 'Courier Prime Bold', width: '60%'}}>{randomLibraryIsLoadingMessage}</Text>
    </View>
  )
}

export default LibraryLoader;
