import './App.css';
import React from 'react';
import Header from './components/Header.js';
import Container from './components/Container.js';
import Footer from './components/Footer.js';

function App() {
  var app = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    width: '100vw',
    height: '100vh',
    overflow: 'hidden'
  }

  return (
    <div style={app}>
      <Header className='header'></Header>
      <Container className='container'></Container>
      <Footer className='footer'></Footer>
    </div>
  );
}

export default App;
