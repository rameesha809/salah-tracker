import { StrictMode } from 'react'
import { Provider } from 'react-redux';
import store from './redux/store';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
createRoot(document.getElementById('root')).render(
    <StrictMode>
     <Provider store={store}>
    <App />
    </Provider>
    </StrictMode>
)
