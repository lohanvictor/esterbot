import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  Bubble,
  BubbleProps,
  Composer,
  ComposerProps,
  IMessage,
  InputToolbar,
  InputToolbarProps,
  MessageImageProps,
  Send,
  SendProps,
  TimeProps,
} from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';

// Styles from container of messages
export const chatStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

const timeStyles = StyleSheet.create({
  view: {
    height: 16,
    position: 'absolute',
    top: -8,
  },
  text: {
    color: '#8897B5',
  },
  left: {
    left: 250,
  },
  right: {right: 250},
});

export const renderTime = (timeProps: TimeProps<IMessage>) => {
  const time = new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timeProps.currentMessage?.createdAt!));
  const side = timeProps.position ?? 'left';

  return (
    <View style={[timeStyles.view, timeStyles[side]]}>
      <Text style={timeStyles.text}>{time}</Text>
    </View>
  );
};

const bubbleStyles = {
  container: StyleSheet.create({
    left: {},
    right: {},
  }),
  wrapper: StyleSheet.create({
    common: {
      padding: 8,
      borderRadius: 12,
      width: 250,
    },
    left: {
      backgroundColor: '#5B8C78',
      borderTopLeftRadius: 0,
    },
    right: {
      backgroundColor: '#87BBA5',
      borderTopRightRadius: 0,
    },
    image: {
      height: 140,
      width: 232,
      borderRadius: 8,
    },
  }),
  text: StyleSheet.create({
    common: {
      color: 'white',
      textAlign: 'justify',
    },
  }),
};

export const renderBubble = (bubbleProps: BubbleProps<IMessage>) => {
  const {container, text, wrapper} = bubbleStyles;
  return (
    <Bubble
      {...bubbleProps}
      containerStyle={{
        left: container.left,
        right: container.right,
      }}
      wrapperStyle={{
        left: [wrapper.common, wrapper.left],
        right: [wrapper.common, wrapper.right],
      }}
      textStyle={{
        left: [text.common],
        right: [text.common],
      }}
      renderTime={renderTime}
    />
  );
};

export const renderMessageImage = (
  bubbleProps: MessageImageProps<IMessage>,
  onClickImage: (uri: string) => void,
) => {
  const uri = bubbleProps.currentMessage?.image ?? '';
  const {wrapper} = bubbleStyles;
  return (
    <View style={wrapper.image}>
      <TouchableOpacity onPress={() => onClickImage(uri)}>
        <Image
          style={{width: '100%', height: 140}}
          source={{uri}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const inputToolbarStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  primary: {
    alignItems: 'center',
    padding: 0,
  },
  empty: {
    backgroundColor: 'white',
    height: 45,
  },
});

export const renderInputToolbar = (
  toolbarProps: InputToolbarProps<IMessage>,
) => {
  return (
    <InputToolbar
      {...toolbarProps}
      containerStyle={inputToolbarStyles.container}
      primaryStyle={inputToolbarStyles.primary}
    />
  );
};

export const renderEmptyInputToolbar = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  toolbarProps: InputToolbarProps<IMessage>,
) => {
  return <View style={inputToolbarStyles.empty} />;
};

const composeStyles = StyleSheet.create({
  input: {
    borderColor: '#2A5A48',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'justify',
    alignItems: 'center',
    color: '#2A5A48',
    padding: 8,
    textAlignVertical: 'center',
  },
});

export const renderComposer = (composerProps: ComposerProps) => {
  return (
    <Composer
      {...composerProps}
      placeholder="Escreva sua mensagem"
      textInputStyle={composeStyles.input}
    />
  );
};

const sendStyles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    color: '#8897B5',
  },
});

export const renderSend = (sendProps: SendProps<IMessage>) => {
  const isDisabled = !sendProps.text;
  return (
    <Send
      {...sendProps}
      alwaysShowSend
      disabled={isDisabled}
      containerStyle={sendStyles.container}
      textStyle={[isDisabled ? sendStyles.disabled : null]}
      label="Enviar">
      <Feather
        name="send"
        size={30}
        color={isDisabled ? '#8897B5' : '#2A5A48'}
      />
    </Send>
  );
};
