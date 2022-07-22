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

            <div className="germanNounArea">
                {state.germanNouns.map((item, i) => {
                    return (
                        <fieldset className="germanNoun" key={i}>
                            <legend>ID: {item.id}</legend>

                            <div className="row">
                                <label htmlFor="article">Article</label>
                                <div className="value">{item.article}</div>
                            </div>

                            <div className="row">
                                <label htmlFor="singular">Singular</label>
                                <div className="value">{item.singular}</div>
                            </div>

                            <div className="row">
                                <label htmlFor="plural">Plural</label>
                                <div className="value">{item.plural}</div>
                            </div>
                            <div className="buttonRow">
                                <div className="message">
                                    {item.message}
                                    {item.isEditing ? (
                                        <div>EDITING</div>
                                    ) : (
                                        <div>not editing</div>
                                    )}
                                </div>
                                <div className="buttonArea">
                                    <button onClick={() => dispatch({type: 'toggleItemEditing', payload: {itemType: 'germanNouns', id: item.id}})}>Edit</button>
                                    <button>Delete</button>
                                    <button>Add</button>
                                </div>
                            </div>
                        </fieldset>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
