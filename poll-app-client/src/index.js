import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
//import PollCreateForm from './pollCreateForm/PollCreateForm';
import PollCreate from './pollCreate/PollCreate';
import registerServiceWorker from './registerServiceWorker';
import 'jquery/src/jquery'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<PollCreate/>, document.getElementById('root'));
registerServiceWorker();
