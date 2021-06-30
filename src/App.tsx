import React from 'react';
import './App.scss';

import Logo from './components/Logo';
import Header from './components/Header';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import Section from './components/Section';

function App() {
  return (
    <div className="App">
      <Header>
        <Hero></Hero>
        <Logo></Logo>
        <Navigation></Navigation>
      </Header>
      <main>
        <Section>
          <Projects></Projects>
        </Section>
      </main>
    </div>
  );
}

export default App;
