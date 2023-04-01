import React, { Fragment, useEffect } from "react";
import './App.css';
import MenuLateral from './components/principal';

const App = () => {

  useEffect(() => {
    var myobj = document.getElementById("probando");
    myobj.remove();
  })

  return (
    <Fragment>
      <MenuLateral/>
      <footer>
      <p className="foooter">Creado por Giorgio Cabrera Sepúlveda</p>
      </footer>
    </Fragment>
  );
}

export default App;
