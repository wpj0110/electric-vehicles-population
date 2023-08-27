export function getFieldNames(jsonData) {
    const fieldMap = new Map();
    jsonData.meta.view.columns.forEach((column, index) => fieldMap.set(column["fieldName"], index));
    return fieldMap;
  }

export function getNewCarCountByYear(fieldNameMap, data ,yearFilter) {
    let newTotalCarsByYearData = [];
    data.forEach(row => {
      const year = row[fieldNameMap.get('model_year')];
      if (year >= yearFilter) {
        let phevIncrement = row[fieldNameMap.get('ev_type')] === "Plug-in Hybrid Electric Vehicle (PHEV)" ? 1 : 0;
        let evIncrement = row[fieldNameMap.get('ev_type')] === "Battery Electric Vehicle (BEV)" ? 1 : 0;
        const yearIndex = newTotalCarsByYearData.findIndex(obj => obj.year === year);
        if (yearIndex < 0) {
          newTotalCarsByYearData.push({year: year, phevCount: phevIncrement, evCount: evIncrement});
        } else {
          newTotalCarsByYearData[yearIndex].phevCount += phevIncrement;
          newTotalCarsByYearData[yearIndex].evCount += evIncrement;
        }
      }
    });

    newTotalCarsByYearData = newTotalCarsByYearData.sort((obj1, obj2) => obj1.year - obj2.year);
    return newTotalCarsByYearData;
}

export function getTotalCarCountByYear(fieldNameMap, data ,yearFilter) {
    let totalCarsByYearData = [];
    data.forEach(row => {
      const year = row[fieldNameMap.get('model_year')];
      if (year >= yearFilter) {
        let phevIncrement = row[fieldNameMap.get('ev_type')] === "Plug-in Hybrid Electric Vehicle (PHEV)" ? 1 : 0;
        let evIncrement = row[fieldNameMap.get('ev_type')] === "Battery Electric Vehicle (BEV)" ? 1 : 0;
        const yearIndex = totalCarsByYearData.findIndex(obj => obj.year === year);
        if (yearIndex < 0) {
            totalCarsByYearData.push({year: year, phevCount: phevIncrement, evCount: evIncrement});
        } else {
            totalCarsByYearData[yearIndex].phevCount += phevIncrement;
            totalCarsByYearData[yearIndex].evCount += evIncrement;
        }
      }
    });
    

    totalCarsByYearData = totalCarsByYearData.sort((obj1, obj2) => obj1.year - obj2.year);

    let initialEvCount = 0;
    let initialPhevCount = 0;
    totalCarsByYearData.forEach(elem => {
        elem.phevCount += initialPhevCount;
        initialPhevCount = elem.phevCount;
        elem.evCount += initialEvCount;
        initialEvCount = elem.evCount;
    });
    return totalCarsByYearData;
}

export  function getCarCountByState(data) {
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