import { currency as cons } from '../constants';
import { fromJS, List } from 'immutable';

const initialState = fromJS({
	load: false,
	loadSuc: false,
	loadErr: false,
  currencies: List()
});

export default function currencies(state = initialState, action = {}) {

	switch(action.type) {
		case cons.LOAD:
			return state.merge({
		    load: true,
		    loadSuc: false,
		    loadErr: false,
		  });
	  case cons.LOAD_SUCCESS: {
	    return state.merge({
	      load: false,
	      loadSuc: true,
	      loadErr: false,
        currencies: fromJS(action.data)
	    });
	  }
	  case cons.LOAD_FAIL:
	    return state.merge({
	      load: false,
	      loadSuc: false,
	      loadErr: action.error,
	  	});
	  default:
	  	return state;
	}
}
