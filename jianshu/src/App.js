import React from 'react';
import { Provider } from 'react-redux';
import GlobalStyle from './style.js';
import IconfontGlobalStyle from './statics/iconfont/iconfont';
import Header from './common/header';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <IconfontGlobalStyle />
      <Header />
    </Provider>
  );
}

export default App;
