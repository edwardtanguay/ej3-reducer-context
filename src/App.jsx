import './App.scss'
import { useContext } from 'react';
import { AppContext } from './AppContext';

function App() {
  const { state, dispatch} = useContext(AppContext);

  return (
    <div className="App">
    <h1>useContext / useReducer Site</h1>

      <p>Count = { state.count }</p>

      <div className="buttonArea">
        <button onClick={() => dispatch('decreaseCount')}>-</button>
        <button onClick={() => dispatch('increaseCount')}>+</button>
      </div>
    </div>
  )
}

export default App
