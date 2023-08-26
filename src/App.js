
import './App.css';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import jsonData from './files/ElectricVehiclePopulationData.json'

function App() {

  const data = jsonData;
  const fieldNameMap = getFieldNames();


  console.log(fieldNameMap);
  

  return (
    <div className="App">
    </div>
  );

  function getCarCountByState(data) {
    const vehicleData = data;
    const phevCountString = "phevCount";
    const evCountString = "evCount";
  
    let stateMap = new Map();
    vehicleData.forEach(row => {
      const state = row[11];
      const isPHEV = row[16] === "Plug-in Hybrid Electric Vehicle (PHEV)";
      if (stateMap.has(state)) {
        let phevCount = stateMap.get(state)[phevCountString];
        let evCount = stateMap.get(state)[evCountString];
        if (isPHEV) {
          phevCount = stateMap.get(state)[phevCountString] + 1;
        } else {
          evCount = stateMap.get(state)[evCountString] + 1;
        }
        const value = {
          evCount: evCount,
          phevCount: phevCount
        }
        stateMap.set(state, value)
      } else {
        let evCount = 0;
        let phevCount = 0;
        if (isPHEV) {
          phevCount += 1;
        } else {
          evCount += 1;
        }
        const value = {
          evCount: evCount,
          phevCount: phevCount
        }
        stateMap.set(state, value)
      }
    });

    return stateMap;
  }

  function getFieldNames() {
    const fieldMap = new Map();
    jsonData.meta.view.columns.forEach((column, index) => fieldMap.set(column["fieldName"], index));
    return fieldMap;
  }

}

export default App;
