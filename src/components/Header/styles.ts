import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A5A48',
  },
  emptyRightIcon: {
    width: 30,
    height: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
