import { useEffect, useState } from "react";
import { Gameboard } from "./components/Gameboard";
import {createEnemyShips, Ships } from "./components/Ships"


export const gridSize = 10;

function App() {

  let enemyShips = createEnemyShips();
  let myShips = [];

  return (
    <div>
      <Gameboard ships = {enemyShips} myShips= {myShips} />
      <Ships />
    </div>
  );
}

export default App;
