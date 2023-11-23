import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { CATEGORY_IMAGES } from "@helpers/constants";
import { Colours } from "@styles/constants";

interface TitleTypes {
  title: string;
  image: string;
  isExpanded: boolean;
  expandAccordion: () => void;
}

const Title: React.FC<TitleTypes> = ({ title, image, isExpanded, expandAccordion }) => {
  
  const getImageSource = (categoryId: string) => {
    const selectedImage = CATEGORY_IMAGES.find((image) => image.id === categoryId);
    return selectedImage ? selectedImage.source : null;
  };

  return (
    <TouchableOpacity onPress={expandAccordion} style={styles.titleContainer}>
      <View style={styles.titleImageContainer}>
        <Image
          source={getImageSource(image)}
          style={styles.categoryImage}
        />
        <Text style={styles.categoryTitle}>
          {title}
        </Text>
      </View>
      <FontAwesome name={isExpanded ? "caret-up" : "caret-down"} size={18} color={Colours.secondary} />
    </TouchableOpacity>
  )
}

export default Title;

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Courier Prime Bold',
    // marginBottom: 8,
    color: Colours.secondary,
    // textAlign: 'center'

    // textDecorationLine: "underline",
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'flex-start',
    // backgroundColor: 'green',
    textAlign: 'center'
  },
  titleImageContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  categoryImage: {
    width: 25,
    height: 25,
    marginRight: 10,
    // backgroundColor: 'pink'
  },
})