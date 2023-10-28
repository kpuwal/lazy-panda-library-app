import { View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LoadingDots } from '@scanner/index';
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
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '90%',
        height: '90%',
        borderWidth: .5,
        borderColor: '#C9CBCF',
        borderRadius: 2}}
      >
        <Image 
          source={require('@assets/panda_meditating.png')}
          style={{paddingTop: 10, width: 120, height: 120}}
        />
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 40}}
        >
          <Text style={{
            marginBottom: 5,
            color: '#3B3E43',
            fontFamily: 'Courier Prime Bold',
            fontSize: 32}}
          >
            Loading
          </Text>
          <LoadingDots colour={'#3B3E43'} />
        </View>
        <Text style={{
          color: '#3B3E43',
          textAlign: 'center',
          paddingVertical: 20,
          fontFamily: 'Courier Prime',
          width: '70%',
          fontSize: 18}}
        >
          {randomLibraryIsLoadingMessage}
        </Text>
      </View>
    </View>
  )
}

export default LibraryLoader;
