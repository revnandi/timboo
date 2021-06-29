import React from 'react';
import './App.scss';

import Logo from './components/Logo';
import Header from './components/Header';
import Hero from './components/Hero';
import Navigation from './components/Navigation';

function App() {
  return (
    <div className="App">
      <Header>
        <Hero></Hero>
        <Logo></Logo>
        <Navigation></Navigation>
      </Header>
    </div>
  );
}

export default App;
