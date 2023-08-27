
import './TotalCarCountByYear.css';
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getFieldNames, getTotalCarCountByYear } from '../../helpers/data-transformer';

function TotalCarCountByYear(props) {

  //const newCarCountByYear = getNewCarCountByYear(jsonData.data);
  const fieldNameMap = getFieldNames(props.jsonContents); //key is field name, value is row index

  let data = getTotalCarCountByYear(fieldNameMap, props.jsonContents.data, 2012);
  

  return (
    <div>
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="phevCount" fill="#FF5733" />
            <Bar dataKey="evCount" fill="#9E2005" />
        </BarChart>
    </div>
  );

}

export default TotalCarCountByYear;
