import React from 'react';
import './App.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import About from './components/About';
import Accordion from './components/Accordion';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero/Hero';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import Projects from './components/Projects/Projects';
import Section from './components/Section';
import Staff from './components/Staff/Staff';
import TitleRow from './components/TitleRow';

const client = new ApolloClient({
  uri: 'https://admin.timboo.org/graphql',
  cache: new InMemoryCache()
});

function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header>
          <Hero></Hero>
          <Logo></Logo>
          <Navigation></Navigation>
        </Header>
        <main>
          <Section>
            <TitleRow text="About"/>
            <About/>
          </Section>
          <Section>
          <TitleRow text="Projects"/>
            <Projects/>
          </Section>
          <Section>
            <TitleRow text="Services"/>
            <Accordion/>
          </Section>
          <Section>
            <TitleRow text="Team"/>
            <Staff/>
          </Section>
          <Section>
            <Footer/>
          </Section>
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
