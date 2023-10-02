import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";
import { navigate } from '../../redux/slices/navigationSlice';
import { useAppDispatch } from '../../redux/store';
import { headerGoBackButton, headerGoBackContainer } from '../../styles/styles';
import { Colours } from "../../styles/constants";

type GoBackProps = {
  goBackUrl: string,
  styling?: any
}

const GoBack: React.FC<GoBackProps> = ({goBackUrl, styling}) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(navigate(goBackUrl));
  }

  return (
    <Pressable
      onPress={handleClose}
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
