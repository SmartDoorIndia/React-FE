/** @format */

import './scss/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import ReactDOM from 'react-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';

// Render Main Component here.
ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
