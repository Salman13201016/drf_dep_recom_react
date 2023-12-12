
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {StoreProvider} from 'easy-peasy'
import store from './store/index';
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
    
  // </React.StrictMode>,
)
