import React from 'react';
import Header from './components/Header';
import ListaProyectos from './components/ListaProyectos';
import Footer from './components/Footer';
import './css/styles.css';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="contenido-principal">
        <ListaProyectos />
      </main>
      <Footer />
    </div>
  );
}

export default App;
