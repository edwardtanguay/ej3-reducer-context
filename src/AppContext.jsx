import { useReducer } from 'react';
import { createContext } from 'react';

export const AppContext = createContext();

const initialState = {
	count: 0
};

const reducer = (state, action) => {
	const _state = { ...state };
	switch (action) {
		case 'increaseCount':
			_state.count++;
			break;
		case 'decreaseCount':
			_state.count--;
			break;
	}
	return _state;
}

export const AppProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<AppContext.Provider value={{
			state,
			dispatch
		}}>{children}</AppContext.Provider>
	)
}