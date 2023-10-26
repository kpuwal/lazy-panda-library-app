import { useState } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { Colours } from "@styles/constants";

interface HomeButtonTypes {
  onPress: () => void;
  title: string;
  imgSource: any;
  imgColourSource: any;
}

const HomeButton = (props: HomeButtonTypes) => {
  const { onPress, title, imgSource, imgColourSource } = props;
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable 
      style={({pressed}) => [
        {
          backgroundColor: pressed ? Colours.action : '#0d0d0d',
          borderWidth: 1,
          borderColour: '#0d0d0d'
        },
        styles.button
      ]} 
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={styles.imgContainer}>
        <Image 
          source={isPressed ? imgColourSource : imgSource}
          style={styles.image} 
        />
      </View>
      <Text 
        style={[styles.text, isPressed ? styles.textPressed : null]} numberOfLines={3} lineBreakMode="tail"
      >
        {title}
      </Text>
    </Pressable>
  )
}

export default HomeButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    width: 210, 
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    width: 100,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center'
  },
  textPressed: {
    color: 'black'
  },
  imgContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    marginRight: 10,
    marginLeft: '15%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 30, 
    height: 30,
  },
});