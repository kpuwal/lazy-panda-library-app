import { useWindowDimensions } from 'react-native';
import { Svg, Path, Line } from 'react-native-svg';

const COLOUR = 'white';
const WIDTH = 2;

const HollowRectangle = () => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const strokeWidth = 0;
  const rectangleWidth = screenWidth - strokeWidth * 2;
  const rectangleHeight = screenHeight - strokeWidth * 2;
  const holeWidth = 250;
  const holeHeight = 200;
  const cornerRadius = 20;
  const cornerLineExtension = 15;
  // Calculate the coordinates for the outer rectangle
  const outerRectX = strokeWidth;
  const outerRectY = strokeWidth;
  const outerRectWidth = rectangleWidth;
  const outerRectHeight = rectangleHeight;

  // Calculate the coordinates for the inner rectangle (hole)
  const innerRectX = (screenWidth - holeWidth) / 2;
  const innerRectY = (screenHeight - holeHeight) / 3;
  const innerRectWidth = holeWidth;
  const innerRectHeight = holeHeight;

  return (
    <Svg width={screenWidth} height={screenHeight}>
      <Path
        d={`
        M ${outerRectX} ${outerRectY}
        L ${outerRectX + outerRectWidth} ${outerRectY}
        L ${outerRectX + outerRectWidth} ${outerRectY + outerRectHeight}
        L ${outerRectX} ${outerRectY + outerRectHeight}
        Z
        M ${innerRectX + cornerRadius} ${innerRectY}
        L ${innerRectX + innerRectWidth - cornerRadius} ${innerRectY}
        Q ${innerRectX + innerRectWidth} ${innerRectY} ${innerRectX + innerRectWidth} ${innerRectY + cornerRadius}
        L ${innerRectX + innerRectWidth} ${innerRectY + innerRectHeight - cornerRadius}
        Q ${innerRectX + innerRectWidth} ${innerRectY + innerRectHeight} ${innerRectX + innerRectWidth - cornerRadius} ${innerRectY + innerRectHeight}
        L ${innerRectX + cornerRadius} ${innerRectY + innerRectHeight}
        Q ${innerRectX} ${innerRectY + innerRectHeight} ${innerRectX} ${innerRectY + innerRectHeight - cornerRadius}
        L ${innerRectX} ${innerRectY + cornerRadius}
        Q ${innerRectX} ${innerRectY} ${innerRectX + cornerRadius} ${innerRectY}
      `}
        fillRule="evenodd"
        fill="rgba(0, 0, 0, 0.2)"
        stroke="none"
      />
      <Path
        d={`
          M ${innerRectX + cornerRadius} ${innerRectY}
          Q ${innerRectX} ${innerRectY} ${innerRectX} ${innerRectY + cornerRadius}
          M ${innerRectX} ${innerRectY + innerRectHeight - cornerRadius}
          Q ${innerRectX} ${innerRectY + innerRectHeight} ${innerRectX + cornerRadius} ${innerRectY + innerRectHeight}
          M ${innerRectX + innerRectWidth - cornerRadius} ${innerRectY + innerRectHeight}
          Q ${innerRectX + innerRectWidth} ${innerRectY + innerRectHeight} ${innerRectX + innerRectWidth} ${innerRectY + innerRectHeight - cornerRadius}
          M ${innerRectX + innerRectWidth} ${innerRectY + cornerRadius}
          Q ${innerRectX + innerRectWidth} ${innerRectY} ${innerRectX + innerRectWidth - cornerRadius} ${innerRectY}

          M ${innerRectX + cornerRadius} ${innerRectY + innerRectHeight}
          Q ${innerRectX} ${innerRectY + innerRectHeight} ${innerRectX} ${innerRectY + innerRectHeight - cornerRadius}
          M ${innerRectX + innerRectWidth - cornerRadius} ${innerRectY}
          Q ${innerRectX + innerRectWidth} ${innerRectY} ${innerRectX + innerRectWidth} ${innerRectY + cornerRadius}
        `}
        fill="none"
        stroke={COLOUR}
        strokeWidth={WIDTH}
      />
      {/* Individual cornerLineExtension paths */}
      {/* Top Left */}
    <Path
      d={`
        M ${innerRectX + cornerRadius} ${innerRectY}
        L ${innerRectX + cornerRadius + cornerLineExtension} ${innerRectY}
        M ${innerRectX} ${innerRectY + cornerRadius}
        L ${innerRectX} ${innerRectY + cornerRadius + cornerLineExtension}
      `}
      fill="none"
      stroke={COLOUR}
      strokeWidth={WIDTH}
    />
    {/* Top Right */}
    <Path
      d={`
        M ${innerRectX + innerRectWidth - cornerRadius - cornerLineExtension} ${innerRectY}
        L ${innerRectX + innerRectWidth - cornerRadius} ${innerRectY}
        M ${innerRectX + innerRectWidth} ${innerRectY + cornerRadius}
        L ${innerRectX + innerRectWidth} ${innerRectY + cornerRadius + cornerLineExtension}
      `}
      fill="none"
      stroke={COLOUR}
      strokeWidth={WIDTH}
    />
    {/* Bottom Right */}
    <Path
      d={`
        M ${innerRectX + innerRectWidth} ${innerRectY + innerRectHeight - cornerRadius - cornerLineExtension}
        L ${innerRectX + innerRectWidth} ${innerRectY + innerRectHeight - cornerRadius}
        M ${innerRectX + innerRectWidth - cornerRadius} ${innerRectY + innerRectHeight}
        L ${innerRectX + innerRectWidth - cornerRadius - cornerLineExtension} ${innerRectY + innerRectHeight}
      `}
      fill="none"
      stroke={COLOUR}
      strokeWidth={WIDTH}
    />
    {/* Bottom Left */}
    <Path
      d={`
        M ${innerRectX + cornerRadius + cornerLineExtension} ${innerRectY + innerRectHeight}
        L ${innerRectX + cornerRadius} ${innerRectY + innerRectHeight}
        M ${innerRectX} ${innerRectY + innerRectHeight - cornerRadius - cornerLineExtension}
        L ${innerRectX} ${innerRectY + innerRectHeight - cornerRadius}
      `}
      fill="none"
      stroke={COLOUR}
      strokeWidth={WIDTH}
    />
    </Svg>
  );
};

export default HollowRectangle;
