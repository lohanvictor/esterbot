import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';

interface HeaderProps {
  title: string;
  rightIcon?: JSX.Element;
}

export const Header = ({rightIcon, title}: HeaderProps) => {
  const navigation = useNavigation();

  function onPressLeft() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <Icon size={28} color="white" name="arrowleft" onPress={onPressLeft} />
      <Text style={styles.title}>{title}</Text>
      {rightIcon ?? <View style={styles.emptyRightIcon} />}
    </View>
  );
};
