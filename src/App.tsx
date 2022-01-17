import { Provider } from 'react-redux';

import store from './redux/store';
import { Root } from './view/Root';

import { CloudinaryContext } from 'cloudinary-react';

function App() {
  return (
    <CloudinaryContext cloudName="c4benn">      
      <Provider store={store}>
        <Root />
      </Provider>
    </CloudinaryContext>
  );
}

export default App;
