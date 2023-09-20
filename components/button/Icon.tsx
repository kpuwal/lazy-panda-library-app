import { Image, ImageSourcePropType } from 'react-native';

type IconProps = {
  uri: ImageSourcePropType,
  size: number
}

const Icon: React.FC<IconProps> = ({ uri, size }) => {
  return <Image source={uri} style={{ width: size, height: size }} />;
};

export default Icon;
