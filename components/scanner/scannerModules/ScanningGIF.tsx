import React, { Component } from 'react';
import { Image } from 'react-native';

export class ScanningGIF extends Component {
  render() {
    return (
      <Image 
        source={require('../../../assets/panda.gif')}  
        style={{ width: 150, height: 150 }}
      />
    )
  }
}

export default React.memo(ScanningGIF);
