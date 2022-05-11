import React, { useState } from 'react';
import '../styles/App.scss';
import Shop from '../components/Shop'
import Header from '../components/Header'

function App() {
  const [searchValue, setSearchValue] = useState("men")
  return (
    <div className="App">
      <header className="App-header">
        <Header onSearchValueChange={setSearchValue}/>
      </header>
      <main>
        <Shop searchValue={searchValue}/>
      </main>
    </div>
  );
}

export default App;
