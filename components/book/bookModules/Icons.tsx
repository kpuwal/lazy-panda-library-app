import React from 'react';
import { Image } from 'expo-image';

const genreIcon = <Image
  source={require('./../../../assets/genre.png')}  
  style={{ width: 25, height: 25 }}
/>

const seriesIcon = <Image 
  source={require('@assets/series.png')}  
  style={{ width: 25, height: 25 }}
/>

const worldIcon = <Image 
  source={require('@assets/world.png')}  
  style={{ width: 25, height: 25 }}
/>

const readByIcon = <Image 
  source={require('@assets/reader.png')}  
  style={{ width: 25, height: 25 }}
/>

const boughtGivenOnIcon = <Image 
  source={require('@assets/gift-box.png')}  
  style={{ width: 25, height: 25 }}
/>

const givenByIcon = <Image 
  source={require('@assets/handover.png')}  
  style={{ width: 25, height: 25 }}
/>

const lastReadIcon = <Image 
  source={require('@assets/glasses.png')}  
  style={{ width: 25, height: 25 }}
/>

const languagesIcon = <Image 
  source={require('@assets/language.png')}  
  style={{ width: 25, height: 25 }}
/>

export {
  genreIcon,
  seriesIcon,
  worldIcon,
  readByIcon,
  boughtGivenOnIcon,
  givenByIcon,
  lastReadIcon,
  languagesIcon
}
