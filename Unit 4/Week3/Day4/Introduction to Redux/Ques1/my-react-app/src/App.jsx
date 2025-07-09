import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './Redux/action.js';

function App() {
  const count = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Redux Counter</h1>
      <h2>Count: {count.count}</h2>
      <button onClick={() => dispatch(increment())}>Increment</button>
      &nbsp;
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default App;
