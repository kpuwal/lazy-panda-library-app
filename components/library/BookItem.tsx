import React, { useEffect, useState, PureComponent } from 'react';
import { connect } from 'react-redux';
import { displayBookData } from '../../redux/slices/bookSlice';
import { navigate, setNavigationSource } from '../../redux/slices/navigationSlice';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { savingBookIsDisabled } from '../../redux/slices/appSlice';
import { Colours } from '../../styles/constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../NavigationStack';

const SPACING = 15;

interface BookItemProps {
  item: { title: string; author: string }; // Update with actual item type
  navigation: any;
  displayBookData: (item: any) => void;
  setNavigationSource: (source: string) => void;
  navigate: (screen: string) => void;
  savingBookIsDisabled: (disabled: boolean) => void;
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

  // componentDidUpdate(prevProps: BookItemProps, prevState: BookItemState) {
  //   const { progress } = this.state;

  //   const progressPercentage = progress * 100;

  //   if (progressPercentage >= 100 && prevState.progress !== 1) {
  //     this.setState({ loading: false });

  //     setTimeout(() => {
  //       this.props.navigation.navigate('Book');
  //     }, 500);
  //   }
  // }

  handleGoToBook = () => {
    this.props.displayBookData(this.props.item);
    this.props.setNavigationSource('Library');
    this.props.navigation.navigate('Book');
  }

  // handleGoToBook = async () => {
  //   this.setState({ loading: true });
  //   this.props.displayBookData(this.props.item);
  //   this.props.savingBookIsDisabled(false);
  //   this.props.setNavigationSource('Library');

  //   const timer = setInterval(() => {
  //     this.setState((prevState) => {
  //       const newProgress = prevState.progress + 0.02;
  //       const clampedProgress = Math.min(newProgress, 1);

  //       if (clampedProgress >= 1) {
  //         clearInterval(timer);
  //         return { progress: 1 };
  //       }

  //       return { progress: clampedProgress };
  //     });
  //   }, 50);
  // };

  render() {
    const { item } = this.props;
    const { loading, progress } = this.state;

    const progressPercentage = progress * 100;

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
          {loading && (
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: Colours.filter,
                  },
                ]}
              />
            </View>
        )}
        </View>
      </Pressable>
    );
  }
}

const mapDispatchToProps = {
  displayBookData,
  navigate,
  setNavigationSource,
  savingBookIsDisabled,
};

export default connect(null, mapDispatchToProps)(BookItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: SPACING,
    height: 90,
    width: '100%',
  },
  textContainer: {
    maxWidth: '96%',
  },
  textTitle: {
    color: Colours.secondary,
    fontFamily: 'Courier Prime',
    fontWeight: 'bold',
    fontSize: 22,
  },
  textAuthor: {
    color: '#808080',
    fontFamily: 'Courier Prime',
    fontWeight: 'bold',
    fontSize: 16,
  },
  progressBarContainer: {
    // position: 'absolute',
    // backgroundColor: 'pink',
    marginTop: 5,
    // bottom: 0,
    height: 5,
    // width: '100%'
  },
  progressBar: {
    // width: '100%',
    // backgroundColor: 'blue',
    height: 1,
    zIndex: 7,
  },
});

