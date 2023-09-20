import { Image, ImageSourcePropType } from 'react-native';

type IconProps = {
  uri: ImageSourcePropType
}

const Icon: React.FC<IconProps> = ({ uri }) => {
  return <Image source={uri} style={{ width: 30, height: 30 }} />;
};

export default Icon;
