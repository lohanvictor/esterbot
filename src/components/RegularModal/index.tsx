import {PropsWithChildren} from 'react';
import {Modal, View} from 'react-native';
import {styles} from './styles';

interface RegularModalProps {
  onClose?: () => void;
}

export const RegularModal = ({
  children,
  onClose,
}: PropsWithChildren<RegularModalProps>) => {
  return (
    <Modal onRequestClose={onClose} visible transparent statusBarTranslucent>
      <View style={styles.backdrop}>{children}</View>
    </Modal>
  );
};
