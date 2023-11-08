import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { connect } from 'react-redux';
import { displayBookData, resetBookMessages, resetLibraryMessages, savingBookIsDisabled, setNavigationSource } from '@reduxStates/index';
import { Colours } from '@styles/constants';
import { ITEM_HEIGHT } from '@helpers/constants';

const SPACING = 15;

interface BookItemProps {
  item: { title: string; author: string }; // Update with actual item type
  navigation: any;
  displayBookData: (item: any) => void;
  setNavigationSource: (source: string) => void;
  savingBookIsDisabled: (disabled: boolean) => void;
  resetLibraryMessages: () => void;
  resetBookMessages: () => void;
}

interface BookItemState {
  loading: boolean;
  progress: number;
}

class BookItem extends PureComponent<BookItemProps, BookItemState> {
  constructor(props: BookItemProps) {
    super(props);

    this.state = {
      loading: false,
      progress: 0,
    };
  }

  handleGoToBook = () => {
    this.props.displayBookData(this.props.item);
    // this.props.resetLibraryMessages();
    // this.props.resetBookMessages();
    this.props.setNavigationSource('Library');
    this.props.navigation.navigate('Book');
  }

  render() {
    const { item } = this.props;

    return (
      <Pressable
        onPress={this.handleGoToBook}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? Colours.action : Colours.primary,
          },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text numberOfLines={2} lineBreakMode="tail" style={styles.textTitle}>
              {item.title}
            </Text>
            <Text
              style={styles.textAuthor}
              numberOfLines={1}
              lineBreakMode="tail"
            >
              {item.author}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }
}

const mapDispatchToProps = {
  displayBookData,
  setNavigationSource,
  savingBookIsDisabled,
  resetLibraryMessages,
  resetBookMessages
};

export default connect(null, mapDispatchToProps)(BookItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: SPACING,
    height: ITEM_HEIGHT,
    width: '100%',
  },
  textContainer: {
    maxWidth: '96%',
  },
  textTitle: {
    color: Colours.secondary,
    fontFamily: 'Courier Prime',
    fontSize: 22,
  },
  textAuthor: {
    color: '#808080',
    fontFamily: 'Courier Prime',
    fontSize: 16,
  },
});
