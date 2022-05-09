import React from 'react';
import '../styles/App.scss';
import Shop from '../components/Shop'
import Header from '../components/Header'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <main>
        <Shop />
      </main>
    </div>
  );
}

export default App;
