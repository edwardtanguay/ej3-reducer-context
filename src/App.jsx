import './App.scss';
import { useContext } from 'react';
import { AppContext } from './AppContext';
import { FormRow } from './components/FormRow';

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

                            <FormRow item={item} title="Article" variable="article" />
                            <FormRow item={item} title="Singular" variable="singular" />
                            <FormRow item={item} title="Plural" variable="plural" />
                            
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
                                    <button
                                        onClick={() =>
                                            dispatch({
                                                type: 'toggleItemEditing',
                                                payload: {
                                                    itemType: 'germanNouns',
                                                    id: item.id
                                                }
                                            })
                                        }
                                    >
                                        Edit
                                    </button>
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
