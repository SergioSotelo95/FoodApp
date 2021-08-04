import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Landing from './components/Landing';
import Form from './components/Form'
import Main from './components/Main';
// import DetalleReceta from './components/DetalleReceta';
// import Detalle from './components/Detalle';
import DetalleReceta from './components/DetalleReceta';



function App() {
  return (
    <React.Fragment>
      
      <Route exact path='/' component={Landing} />
      <Route path='/recipes' component={Main} />
      <Route path='/CreateRecipe' component={Form} />
      <Route path='/recipe/:id' component={DetalleReceta}/>

    </React.Fragment>
  );
}

export default App;
