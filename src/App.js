import './styles/App.css';
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import makeStore from './redux/store'
import router from './router';

const store = makeStore();

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
