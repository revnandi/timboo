import React from 'react';
import './App.scss';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import About from './components/About';
import Accordion from './components/Accordion';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Logo from './components/Logo';
import Navigation from './components/Navigation';
import Projects from './components/Projects';
import Section from './components/Section';
import Staff from './components/Staff';

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
            <About></About>
          </Section>
          <Section>
            <Projects></Projects>
          </Section>
          <Section>
            <Accordion></Accordion>
          </Section>
          <Section>
            <Staff></Staff>
          </Section>
          <Section>
            <Footer></Footer>
          </Section>
        </main>
      </div>
    </ApolloProvider>
  );
}

export default App;
