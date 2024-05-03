import {PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar, View, useColorScheme} from 'react-native';
import {styles} from './styles';

export const FixedPage = ({children}: PropsWithChildren) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.fixedView}>{children}</View>
    </SafeAreaView>
  );
};
