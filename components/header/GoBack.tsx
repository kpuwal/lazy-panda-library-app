import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { headerGoBackButton, headerGoBackContainer } from '../../styles/styles';
import { Colours } from "../../styles/constants";
import { useNavigation } from "@react-navigation/native";

type GoBackProps = {
  goBackUrl: string,
  styling?: any
}

const GoBack: React.FC<GoBackProps> = ({goBackUrl, styling}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.goBack();
  }

  return (
    <Pressable
      onPress={handlePress}
      style={[headerGoBackButton, styling]}>
      {({pressed}) => 
      <View style={headerGoBackContainer}>
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color={pressed ? Colours.action : Colours.secondary }
        />
      </View>}
    </Pressable>
  )
}

export default GoBack;
