// ImageSelector.tsx

import React from "react";
import { View, Image, Pressable, StyleSheet, ImageSourcePropType, ScrollView, Text } from "react-native";
import { CATEGORY_IMAGES } from '@helpers/constants';
import { Colours } from "@styles/constants";

interface ImageSelectorProps {
  selectedImage: string;
  onSelectImage: (id: string) => void;
}

const ImageSelector: React.FC<ImageSelectorProps> = ({ selectedImage, onSelectImage }) => {

  const handleImagePress = (imageId: string) => {
    const newSelectedImage = imageId !== selectedImage ? imageId : '';
    onSelectImage(newSelectedImage);
  };

  const renderImages = () => {
    return CATEGORY_IMAGES.map((image) => (
      <Pressable
        key={image.id}
        style={({ pressed }) => [
          styles.imageContainer,
          pressed && { borderColor: Colours.filter },
          image.id === selectedImage && { borderColor: Colours.filter },
        ]}
        onPress={() => handleImagePress(image.id)}
      >
        <Image source={image.source} style={styles.image} />
      </Pressable>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTxt}>add image to the category (or not)</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.row}>{renderImages()}</View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  headerTxt: {
    fontFamily: 'Courier Prime',
    color: Colours.secondary
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  imageContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "transparent",
    padding: 5,
  },
  image: {
    width: 35,
    height: 35,
  },
});

export default ImageSelector;
