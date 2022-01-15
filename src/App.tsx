import { Provider } from 'react-redux';

import store from './redux/store';
import { Root } from './view/Root';


function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
