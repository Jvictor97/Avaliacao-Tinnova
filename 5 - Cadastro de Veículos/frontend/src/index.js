import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'fontsource-roboto';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import apiMiddleware from 'middlewares/apiMiddleware';
import rootReducer from 'redux/reducers';
import { Provider } from 'react-redux';
import { compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewareEnhancer = applyMiddleware(apiMiddleware, thunkMiddleware);
const store = createStore(rootReducer, undefined, composeEnhancers(middlewareEnhancer));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
