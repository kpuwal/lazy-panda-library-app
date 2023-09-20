import { MaterialIcons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { navigate } from '../../redux/slices/navigationSlice';
import { useAppDispatch } from '../../redux/store';
import { headerGoBackButton } from '../../styles/styles';

type GoBackProps = {
  goBackUrl: string
}

const GoBack: React.FC<GoBackProps> = ({goBackUrl}) => {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(navigate(goBackUrl));
  }

  return (
    <Pressable onPress={handleClose} style={headerGoBackButton}>
      <MaterialIcons name="arrow-back-ios" size={24} color="black" />
    </Pressable>
  )
}

export default GoBack;
