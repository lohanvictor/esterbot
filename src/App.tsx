/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Routes} from './routes';
import {ChatProvider} from './contexts/useChat';

function App(): React.JSX.Element {
  return (
    <ChatProvider>
      <Routes />
    </ChatProvider>
  );
}

export default App;
