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
            item = _state[itemType].find((m) => m.id === id);
            item.isEditing = !item.isEditing;
            break;
        case 'handleItemFieldChange':
            itemType = action.payload.itemType;
            id = action.payload.id;
            field = action.payload.field;
            value = action.payload.value;
            item = _state[itemType].find((m) => m.id === id);
            item[field] = value;
            break;
        case 'clearItemEditing':
            itemType = action.payload.itemType;
            id = action.payload.id;
            item = _state[itemType].find((m) => m.id === id);
            item.isEditing = false;
            Object.entries(item.originalItem).forEach((kv) => {
                const key = kv[0];
                const value = kv[1];
                item[key] = value;
            });
            break;
        case 'saveItemEditing':
            itemType = action.payload.itemType;
            id = action.payload.id;
            item = _state[itemType].find((m) => m.id === id);
            item.isEditing = false;
            item.message = 'Manage options:';
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
            _germanNouns.forEach((item) => {
                item.isEditing = false;
                item.originalItem = { ...item };
            });
            dispatch({ type: 'loadGermanNouns', payload: _germanNouns });
        })();
    }, []);

    const actionManager = async (action) => {
        const itemType = action.payload.itemType;
        const id = action.payload.id;
        const item = action.payload.item;
        let response = {};
        switch (action.type) {
            case 'saveItemEditing':
                response = await axios.patch(
                    `${api_base_url}/${itemType}/${id}`,
                    item
                );
                break;
        }
        if ([200, 201].includes(response.status)) {
            dispatch(action);
        } else {
            dispatch({
                type: 'displayItemMessage',
                payload: {
                    itemType,
                    id,
                    message: `error: api response = ${response.status}`
                }
            });
        }
    };

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch,
                actionManager
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
