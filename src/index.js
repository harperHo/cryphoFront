import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom'
import { App } from './containers';

render(
	<HashRouter>
		<App />
	</HashRouter>,
	document.getElementById('app'),
);