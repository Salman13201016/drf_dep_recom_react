
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {StoreProvider} from 'easy-peasy'
import store from './store/index';
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="258463689199-vbsd67tkpjbh5qagnfmlv2tckkhs3h2o.apps.googleusercontent.com">
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </GoogleOAuthProvider>

  // </React.StrictMode>,
);
