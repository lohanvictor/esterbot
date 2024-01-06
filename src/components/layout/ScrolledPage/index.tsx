import {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {styles} from './styles';

export const ScrolledPage = ({children}: PropsWithChildren) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        translucent
        backgroundColor="transparent"
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.scrollView}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};
