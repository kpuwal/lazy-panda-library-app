import AsyncStorage from '@react-native-async-storage/async-storage';
import { hydrateLibraryDataFromStorage, hydrateSettingsDataFromStorage} from './index';

const updateDataForKey = (key: string, data: any, dispatch: Function) => {
  switch (key) {
    case 'library':
      console.log('libr')
      dispatch(hydrateLibraryDataFromStorage(data));
      break;
    case 'settings':
      console.log('sett')
      dispatch(hydrateSettingsDataFromStorage(data));
      break;
    default:
      console.warn(`Unrecognized key: ${key}`);
  }
};

export const initializeApp = async (dispatch: Function) => {
  try {
    const whitelist = ['library', 'settings'];

    await Promise.all(whitelist.map(async (key) => {
      const storedData = await AsyncStorage.getItem(key);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        updateDataForKey(key, parsedData, dispatch);
      }
    }));

    // Fetch additional data from API if needed
    // dispatch(fetchDataFromStorage());
    console.log('initialial success')
  } catch (error) {
    console.error('Error initializing app:', error);
  }
};
