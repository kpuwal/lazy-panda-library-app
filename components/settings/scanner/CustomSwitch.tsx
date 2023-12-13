import { Colours } from '@styles/constants';
import React, { useState } from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';

const CustomSwitch = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isEnabled ? 'ON' : 'OFF'}</Text>
      <Switch
        trackColor={{ false: '#767577', true: Colours.filter }}
        thumbColor={isEnabled ? Colours.primary : Colours.tertiary}
        ios_backgroundColor={Colours.secondary}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    marginRight: 15,
    color: Colours.tertiary
  },
  text: {
    marginRight: 0
  }
});

export default CustomSwitch;
