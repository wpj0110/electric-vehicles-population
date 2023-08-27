
import './App.css';
import {React, useState} from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import jsonData from './files/ElectricVehiclePopulationData.json'
import { getFieldNames, getNewCarCountByYear } from './helpers/data-transformer';
import NewCarCountByYear from './components/NewCarCountByYear/NewCarCountByYear';
import TotalCarCountByYear from './components/TotalCarCountByYear/TotalCarCountByYear';

function App() {

  //const newCarCountByYear = getNewCarCountByYear(jsonData.data);
  const jsonContents = jsonData;
  const fieldNameMap = getFieldNames(jsonContents); //key is field name, value is row index;

  const [displayChart, setDisplayChart] = useState('NewCarCountByYear');

  return (
    <div className="App">
      <div onClick={handleChange}>Click me</div>
      {displayChart === 'NewCarCountByYear' ?<NewCarCountByYear jsonContents={jsonContents}></NewCarCountByYear> : null}
      {displayChart === 'TotalCarCountByYear' ?<TotalCarCountByYear jsonContents={jsonContents}></TotalCarCountByYear> : null}
    </div>
  );

  function handleChange() {
    if (displayChart === 'NewCarCountByYear') {
      setDisplayChart('TotalCarCountByYear');
    } else {
      setDisplayChart('NewCarCountByYear');
    }

  }

}

export default App;
