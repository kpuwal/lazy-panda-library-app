import { StyleSheet } from 'react-native';

export const HeaderStyle = {
  flexDirection: 'row',
  alignItems: 'flex-start',
  height: 50,
  backgroundColour: 'pink'
};

export const buttonSml = {
  width: '40%',
}

export const buttonMid = {
  width: '90%',
}

export const buttonLong = {
  width: '100%'
}

export const buttonLrg = {
  width: '50%'
}

export const buttonBlue = {
  borderColor: '#fff',
  borderWidth: 2
}

const headerStyle = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: 30
  },
  text: {
    left: 8,
    fontSize: 28,
    fontFamily: 'Courier Prime',
  },
  goBackContainer: {
    width: 30, 
    height: 30, 
    justifyContent: 'center'
  },
  goBackButton: {
    flex: 1, // Take up 10% of the available space
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginRight: 10,
    height: 30,
  },
  headerInfo: {
    flex: 9, // Take up 90% of the available space
    flexDirection: 'row',
    alignItems: 'center',
  }
})

export const headerContainer = headerStyle.container;
export const headerText = headerStyle.text;
export const headerGoBackContainer = headerStyle.goBackContainer;
export const headerGoBackButton = headerStyle.goBackButton;
export const headerInfoContainer = headerStyle.headerInfo;
