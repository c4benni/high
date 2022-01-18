import { Provider } from 'react-redux';

import store from './redux/store';
import { Root } from './view/Root';

import { CloudinaryContext } from 'cloudinary-react';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    // @ts-ignore
    <Router>

    <CloudinaryContext cloudName="c4benn">      
      <Provider store={store}>
        <Root />
      </Provider>
    </CloudinaryContext>
    </Router>
  );
}

export default App;
