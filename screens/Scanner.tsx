import { useEffect } from 'react';
import { useAppDispatch } from '../redux/store';
import { fetchPicker } from '../redux/slices/pickerSlice';

import ScannerOverlay from '../components/scanner/scannerModules/ScannerOverlay';
import BarcodeScanner from '../components/scanner/BarcodeScanner';

const Scanner = ({navigation}: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPicker());
  }, []);

  return (
    <>
      <BarcodeScanner navigation={navigation} />
      <ScannerOverlay />
    </>
  )
}

export default Scanner;
