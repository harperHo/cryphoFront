import { currency as cons } from '../constants';

export function getCurrencies() {
  // return {
  //   type: cons.LOAD
  // };

  // return (dispatch) => {
  // 	dispatch({
  // 		type: cons.LOAD
  // 	});
  // 	fetch('http://localhost:3000/currencies')
  // 		.then(response => {
  // 			const status = response.status;

  // 			if (status !== 200) throw status;

  // 			return response.json();
  // 		})
  // 		.then(json => {
  // 			dispatch({
  // 				type: cons.LOAD_SUCCESS,
  // 				data: json
  // 			});
  // 		})
  // 		.catch(err => {
  // 			dispatch({
  // 				type: cons.LOAD_FAIL,
  // 				error: err
  // 			});
  // 		});
  // };

  return (dispatch) => {
    dispatch({
      type: cons.LOAD
    });
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: '{ currencies }' })
    }).then(res => {
        const status = res.status;

        if (status !== 200) throw status;

        return res.json();
      })
      .then(json => {
        dispatch({
          type: cons.LOAD_SUCCESS,
          data: json.data.currencies
        });
      })
      .catch(err => {
        dispatch({
          type: cons.LOAD_FAIL,
          error: err
        });
      });
  };
}
