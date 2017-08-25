import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import Bienvenida from './Bienvenida';
import Terminos from './Terminos';
import Log from './Log';
import Login from './Login';
import Inicio from './Inicio';
{/*
import Ingresos from './Ingresos';
import Gastos from './Gastos';
import Ahorros from './Ahorros';
import Perfil from './Perfil';
import NuevoAhorro from './NuevoAhorro';
import Grafica from './Grafica';
import Tips from './Tips';*/}

{/*import IngresosIntro from './IngresosIntro';
import GastosIntro from './GastosIntro';*/}

const Routes = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="Bienvenida" header={null} component={Bienvenida} initial/>
        <Scene key="Terminos" header={null} component={Terminos}/>
        <Scene key="Log" header={null} component={Log}/>
        <Scene key="Login" header={null} component={Login} />
        <Scene key="Inicio" header={null} component={Inicio}/>
        {/*
        <Scene key="IngresosIntro" header={null} component={IngresosIntro} />
        <Scene key="GastosIntro" header={null} component={GastosIntro}/>
        <Scene key="Perfil" header={null} component={Perfil}/>
        <Scene key="Ingresos" header={null} component={Ingresos} />
        <Scene key="Gastos" header={null} component={Gastos}/>
        <Scene key="Ahorros" header={null} component={Ahorros}/>
        <Scene key="NuevoAhorro" header={null} component={NuevoAhorro}/>
        <Scene key="Grafica" header={null} component={Grafica}/>
        <Scene key="Tips" header={null} component={Tips}/>*/}
      </Scene>
    </Router>
  );
}
export default Routes;
