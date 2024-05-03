import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  keyboard: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: 'white',
    flexDirection: 'column',
    gap: 8,
    padding: 16,
  },
  modalTitle: {
    color: '#222',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalButtonWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  modalButton: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    textAlign: 'center',
  },
  modalButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtonTextNo: {
    color: '#2A5A48',
  },
  modalButtonTextYes: {
    color: 'white',
  },
});
