
import './NewCarCountByYear.css';
import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getFieldNames, getNewCarCountByYear } from '../../helpers/data-transformer';

function NewCarCountByYear(props) {

  //const newCarCountByYear = getNewCarCountByYear(jsonData.data);
  const fieldNameMap = getFieldNames(props.jsonContents); //key is field name, value is row index

  let data = getNewCarCountByYear(fieldNameMap, props.jsonContents.data, 2012);
  

  return (
    // <div>
    //     <BarChart width={730} height={250} data={data}>
    //         <CartesianGrid strokeDasharray="3 3" />
    //         <XAxis dataKey="year" />
    //         <YAxis />
    //         <Tooltip />
    //         <Legend />
    //         <Bar dataKey="phevCount" fill="#FACE61" />
    //         <Bar dataKey="evCount" fill="#C58D02" />
    //     </BarChart>
    // </div>
    <div>
        <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="phevCount" fill="#FACE61" />
            <Bar dataKey="evCount" fill="#C58D02" />
        </BarChart>
    </div>
  );

}

export default NewCarCountByYear;
