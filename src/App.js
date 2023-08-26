
import './App.css';
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import jsonData from './files/ElectricVehiclePopulationData.json'
import { getFieldNames, getNewCarCountByYear } from './helpers/data-transformer';

function App() {

  //const newCarCountByYear = getNewCarCountByYear(jsonData.data);
  const fieldNameMap = getFieldNames(jsonData); //key is field name, value is row index

  let data = getNewCarCountByYear(fieldNameMap, jsonData.data, 2012);

  console.log("here",data);
  

  return (
    <div className="App">
      <BarChart width={730} height={250} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="phevCount" fill="#8884d8" />
      <Bar dataKey="evCount" fill="#82ca9d" />
    </BarChart>
    </div>
  );

}

export default App;
