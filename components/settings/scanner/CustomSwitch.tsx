import { Colours } from '@styles/constants';
import React from 'react';
import { View, Switch, Text, StyleSheet } from 'react-native';

interface CustomSwitchProps {
  status: boolean;
  onToggle: () => void;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({ status, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, {color: status ? Colours.filter : Colours.tertiary}]}>{status ? 'ON' : 'OFF'}</Text>
      <Switch
        trackColor={{ false: '#767577', true: Colours.filter }}
        thumbColor={status ? Colours.primary : Colours.tertiary}
        ios_backgroundColor={Colours.secondary}
        onValueChange={onToggle}
        value={status}
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
    marginRight: 15
  },
});

export default CustomSwitch;
