import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { CATEGORY_IMAGES } from "@helpers/constants";
import { Colours } from "@styles/constants";
import { accordionTitle, accordionTitleContainer, accordionTitleImage, accordionTitleImageContainer } from "@styles/accordion";

interface TitleTypes {
  title: string;
  image: string | null;
  isExpanded: boolean;
  expandAccordion: () => void;
}

const Title: React.FC<TitleTypes> = ({ title, image, isExpanded, expandAccordion }) => {

  const getImageSource = (categoryId: string | null) => {
    if (!categoryId) {
      return null;
    }

    const selectedImage = CATEGORY_IMAGES.find((img) => img.id === categoryId);
    return selectedImage ? selectedImage.source : null;
  };

  return (
    <TouchableOpacity onPress={expandAccordion} style={accordionTitleContainer}>
      <View style={accordionTitleImageContainer}>
        <Image
          source={getImageSource(image)}
          style={accordionTitleImage}
        />
        <Text style={accordionTitle}>
          {title}
        </Text>
      </View>
      <FontAwesome name={isExpanded ? "caret-up" : "caret-down"} size={18} color={Colours.secondary} />
    </TouchableOpacity>
  )
}

export default Title;
