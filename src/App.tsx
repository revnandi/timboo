import React from 'react';
import './App.scss';

import About from './components/About';
import Logo from './components/Logo';
import Footer from './components/Footer';
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
        <Section>
          <About></About>
        </Section>
        <Section>
          <Footer></Footer>
        </Section>
      </main>
    </div>
  );
}

export default App;
