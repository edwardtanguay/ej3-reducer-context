import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';

export const AppContext = createContext();

const api_base_url = 'http://localhost:4555';

const initialState = {
    count: 0,
    germanNouns: []
};

const reducer = (state, action) => {
    const _state = { ...state };
	   
	let itemType = null;
	let id = null;
	let item = null;
	let field = null;
	let value = null;

    switch (action.type) {
        case 'increaseCount':
            _state.count++;
            break;
        case 'decreaseCount':
            _state.count--;
            break;
		case 'loadGermanNouns':
			_state.germanNouns = action.payload;
			break;
		case 'toggleItemEditing':
			itemType = action.payload.itemType;
			id = action.payload.id;
			item = _state[itemType].find(m => m.id === id);
			item.isEditing = !item.isEditing;
			break;
		case 'handleItemFieldChange':
			itemType = action.payload.itemType;
			id = action.payload.id;
			field = action.payload.field;
			value = action.payload.value;
			item = _state[itemType].find(m => m.id === id);
			item[field] = value;
			break;
    }
    return _state;
};

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        (async () => {
            const _germanNouns = (
                await axios.get(`${api_base_url}/germanNouns`)
            ).data;
			_germanNouns.forEach(item => {
				item.isEditing = false;
			})
            dispatch({ type: 'loadGermanNouns', payload: _germanNouns });
        })();
    }, []);

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
