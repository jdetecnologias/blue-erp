import React from 'react';
import ReactDOM from 'react-dom';
import App from './main/app';
import Auth from './common/operator/autenticador'
import  './template/dependencies.js'
import * as serviceWorker from './serviceWorker'
import {applyMiddleware, createStore} from 'redux'
import {Provider} from 'react-redux'
import Reducers from './main/reducers'
import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__
&& window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(thunk,multi,promise)(createStore)(Reducers,devTools)

ReactDOM.render(
				<Provider store={store}>
					<Auth>
						<App />
					</Auth>
				</Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
