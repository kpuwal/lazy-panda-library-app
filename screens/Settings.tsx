import { RootStackParamList } from "@components/NavigationStack";
import Header from "@components/header/Header";
import { ITEM_HEIGHT } from "@helpers/constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Colours } from "@styles/constants";
import { headerInfoContainer, headerText } from "@styles/styles";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Settings = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar style="dark" />
      <Header>
        <Header.GoBack />
        <View style={headerInfoContainer}>
          <Header.Icon uri={require('@assets/settings.gif')} />
          <Header.StyledText customStyle={headerText}>Settings</Header.StyledText>
        </View>
      </Header>
      <Pressable onPress={() => navigation.navigate('Tags')}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Ionicons name="ios-pricetags-sharp" style={{paddingRight: 20}} size={28} color={Colours.secondary} />
            <Text style={styles.textTitle}>Book Tags</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Category')}>
        <View style={styles.container}>
          <View style={styles.title}>
            <MaterialCommunityIcons name="format-list-text" style={{paddingRight: 20}} size={30} color={Colours.secondary} />
            <Text style={styles.textTitle}>Library Categories</Text>
          </View>
          <Ionicons name="chevron-forward-outline" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  )
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // padding: SPACING,
    height: ITEM_HEIGHT,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Colours.quinary,
    marginBottom: 5
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  textTitle: {
    color: Colours.secondary,
    fontFamily: 'Courier Prime',
    fontSize: 22,
    paddingVertical: 20
  },
})
