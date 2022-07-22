import './App.scss'
import { useContext } from 'react';
import { AppContext } from './AppContext';

function App() {
  const { count } = useContext(AppContext);

  return (
    <div className="App">
    <h1>useContext / useReducer Site</h1>

      <p>Count = { count }</p>
    </div>
  )
}

export default App
