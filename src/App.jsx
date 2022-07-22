import './App.scss';
import { useContext } from 'react';
import { AppContext } from './AppContext';

function App() {
    const { state, dispatch } = useContext(AppContext);

    return (
        <div className="App">
            <h1>useContext / useReducer Site</h1>

            <h2>Count</h2>
            <p>Count = {state.count}</p>

            <div className="buttonArea">
                <button onClick={() => dispatch({ type: 'decreaseCount' })}>
                    -
                </button>
                <button onClick={() => dispatch({ type: 'increaseCount' })}>
                    +
                </button>
            </div>
        
        <h2>German Nouns</h2>
        <p>There are {state.germanNouns.length} German nouns.</p>
        </div>
    );
}

export default App;
