import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useAppDispatch } from '../../../redux/store';
import { updateBook } from '../../../redux/slices/bookSlice';


type DateCardTypes = {
  type: string,
}


const DateCard = ({ type }: DateCardTypes) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const dispatch = useAppDispatch();

  const dayInputRef = useRef<TextInput | null>(null);
  const monthInputRef = useRef<TextInput | null>(null);
  const yearInputRef = useRef<TextInput | null>(null);

  const handleDayChange = (text: string) => {
    setDay(text);
    if (text.length === 2) {
      monthInputRef.current?.focus();
    }
  };

  const handleMonthChange = (text: string) => {
    setMonth(text);
    if (text.length === 2) {
      yearInputRef.current?.focus();
    }
  };

  useEffect(() => {
    let date = '';
    if (day === '' && month !== '' && year !== '') {
      date = month + '/' + year;
    } else if (day === '' && month === '' && year === '') {
      date = '';
    } else {
      date = day + '/' + month + '/' + year;
    }
    dispatch(updateBook({ [type]: date }));
  }, [day, month, year]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.txt}>day</Text>
        <Text style={styles.txt}>month</Text>
        <Text style={styles.txt}>year</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          ref={dayInputRef}
          style={styles.input}
          value={day}
          onChangeText={handleDayChange}
          maxLength={2}
          keyboardType='numeric'
          returnKeyType='next'
          onSubmitEditing={() => monthInputRef.current?.focus()}
        />
        <Text style={styles.slash}>/</Text>
        <TextInput
          ref={monthInputRef}
          style={styles.input}
          value={month}
          onChangeText={handleMonthChange}
          maxLength={2}
          keyboardType='numeric'
          returnKeyType='next'
          onSubmitEditing={() => yearInputRef.current?.focus()}
        />
        <Text style={styles.slash}>/</Text>
        <TextInput
          ref={yearInputRef}
          style={styles.input}
          value={year}
          onChangeText={setYear}
          maxLength={4}
          keyboardType='numeric'
        />
      </View>
    </>
  );
};



export default DateCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
    marginHorizontal: 15,
  },
  input: {
    lineHeight: 30,
    fontSize: 27,
    textAlign: 'center',
    fontFamily: 'Courier Prime Bold',
    width: '20%',
    height: 50,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    paddingHorizontal: 18,
    fontFamily: 'Courier Prime',
  },
  slash: {
    fontSize: 27,
    fontFamily: 'Courier Prime',
  }
});
