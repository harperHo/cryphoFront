import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
// import thunk from 'redux-thunk';

// import reducer from './redux/reducers/reducer';
import createClient from './helpers/createClient';
import { App, Home} from './containers';

import './style/css/main.css';

// const store = createStore(
// 	reducer,
// 	applyMiddleware(thunk)
// );

const client = createClient();

render(
	<ApolloProvider client={client}>
		<HashRouter>
			<App>
				<Route exact path="/" component={Home} />
			</App>
		</HashRouter>
	</ApolloProvider>,
	document.getElementById('app'),
);


// render(
//   <Provider store={store}>
//     <HashRouter>
//       <App>
//         <Route exact path="/" component={Home} />
//       </App>
//     </HashRouter>
//   </Provider>,
//   document.getElementById('app'),
// );
