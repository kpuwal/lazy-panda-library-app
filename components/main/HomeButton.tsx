import { useState } from "react";
import { Text, View, StyleSheet, Pressable, Image } from "react-native";
import { Colours } from "../../styles/constants";

interface Props {
  pressed: boolean;
}

export default function HomeButton(props: any) {
  const { onPress, title, imgSource, imgCol } = props;
  const [isPressed, setIsPressed] = useState(false);
  const colourGreen = '#B6E902';
  const colourBlue = 'rgb(210, 230, 255)'

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
        <Pressable style={({pressed}) => [
          {
            backgroundColor: pressed ? Colours.action : 'black'
          },
          styles.button
        ]} onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
          <View style={styles.imgContainer}>
            <Image 
              source={isPressed ? imgCol : imgSource}
              style={styles.image} 
            />
          </View>
          <Text style={[styles.text, isPressed ? styles.textPressed : null]} numberOfLines={3} lineBreakMode="tail">
            {title}
          </Text>
        </Pressable>
  )
}

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