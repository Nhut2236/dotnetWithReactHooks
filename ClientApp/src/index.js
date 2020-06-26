import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { StateProvider } from './store';
import 'element-theme-default';

const app = (
    <StateProvider>
        <App />
    </StateProvider>
);

ReactDOM.render(app, document.getElementById('root'))
