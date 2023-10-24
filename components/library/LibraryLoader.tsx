import { View, Text, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoadingDots from '../scanner/scannerModules/LoadingDots';

const   MESSAGES = [
  "Take a deep breath and channel your inner panda wisdom while we fetch your books. 📚🌿",
  "Close your eyes and imagine a bamboo forest. We'll have your books waiting when you open them. 🎋📖",
  "While you wait, our library pandas are practicing their martial arts. They'll be back with your books soon! 🥋📚",
  "It's panda meditation time! Let's all zen out while your library loads. 🧘‍♀️📚",
  "Did you know pandas spend most of their day relaxing? So can you while we prepare your library. 🐼💤",
];

const LibraryLoader = () => {
  const randomIndex = Math.floor(Math.random() * MESSAGES.length);
  const randomMessage = MESSAGES[randomIndex];

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
      <Text style={{padding: 30, fontFamily: 'Courier Prime Bold', width: '60%'}}>{randomMessage}</Text>
    </View>
  )
}

export default LibraryLoader;
