import { Provider } from 'react-redux';

import store from './redux/store';
import { Root } from './view/Root';

import { CloudinaryContext } from 'cloudinary-react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';

let overlayWrapperCreated = false;

function App() {
  useEffect(() => {
    if (overlayWrapperCreated === false) {
      const overlayWrapper = document.createElement('div')
      overlayWrapper.id = 'ui-overlay';
      document.body.append(overlayWrapper)
      overlayWrapperCreated = true
    }
  })
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
