import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 128,
    padding: 16,
    flex: 1,
  },
  button: {
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: 'bold',
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: '#2A5A48',
    textAlign: 'center',
    fontSize: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: 'white',
  },
});
