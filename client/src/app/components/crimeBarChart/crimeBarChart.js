import React from 'react';
import { Bar } from '@vx/shape';
import { Group } from '@vx/group';
import { scaleBand, scaleLinear } from '@vx/scale';
import './crimeBarChart.css';



export const CrimeBarChart = ({width, height, crimeLocations}) => {


  // use redux to change state
const getCountsByCategory = crimeLocations.reduce((categoriesSum, crimeLocation ) => {
  switch (crimeLocation.category) {
   case "all_crime":
   categoriesSum["unknown"] +=1;
   break;
   case "anti-social-behaviour":
   categoriesSum["Anti-social behaviour"] +=1;
   break;
   case "bicycle-theft":
   categoriesSum["Bicycle theft"] +=1;
   break;
   case "burglary":
   categoriesSum["Burglary"] +=1;
   break;
   case "criminal-damage-arson":
   categoriesSum["Criminal damage and arson"] +=1;
   break;
   case "drugs":
   categoriesSum["Drugs"] +=1;
   break;
   case "other-crime":
   categoriesSum["Other crime"] +=1;
   break;
   case "other-theft":
   categoriesSum["theft"] +=1;
   break;
   case "theft-from-the-person":
   categoriesSum["theft"] +=1;
   break; 
   case "possession of weapons":
   categoriesSum["possession of weapons"] +=1;
   break;
   case "public-order":
   categoriesSum["public-order"] +=1;
   break;  
   case "robbery":
   categoriesSum["Robbery"] +=1;
   break;
   case "shoplifting":
   categoriesSum["shoplifting"] +=1;
   break; 
   case "general_theft":
   categoriesSum["general_theft"] +=1;
   break; 
   case "violent_crime":
   categoriesSum["violent-crime"] +=1;
   break; 
   case "vehicle_crime":
   categoriesSum["vehicle-crime"] +=1;
   break; 
   case "violence and sexual offences":
   categoriesSum["violence and sexual offences"] +=1;
   break;
   default:
   categoriesSum["other-crime"] +=1;
   break;
  }
  return categoriesSum;
}, {
  "unknown":  0 ,
  "other_crime": 0,
  "violence and sexual offences": 0,
  "vehicle-crime": 0,
  "violent-crime": 0,
  "general_theft": 0,
  "shoplifting": 0,
  "Robbery": 0,
  "public-order": 0,
  "possession of weapons": 0,
  "theft": 0,
  "other-crime": 0,
  "Drugs": 0,
  "Criminal damage and arson": 0,
  "Burglary": 0,
  "Bicycle theft": 0,
  "Anti-social behaviour": 0
});

// colours 
// labels
const data = Object.keys(getCountsByCategory)
  .map(category => ({"category":category,"frequency":getCountsByCategory[category]}))

// d.crime
const x = d => d.category;
const y = d => +d.frequency * 100
  // bounds
  const xMax = width;
  const yMax = height - 120;

  // scales
  const xScale = scaleBand({
    rangeRound: [0, xMax],
    domain: data.map(x),
    padding: 0.4
  });
  const yScale = scaleLinear({
    rangeRound: [yMax, 0],
    domain: [0, Math.max(...data.map(y))]
  });


// bar color

const barChart = crimeLocations.length > 0 ? 
<svg width={width} height={height}>
  <rect width={width} height={height} fill={"url(#teal)"} rx={14} />
  <Group top={40}>
    {data.map((d, i) => {
      const category = x(d);
      const barWidth = xScale.bandwidth();
      const barHeight = yMax - yScale(y(d));
      const barX = xScale(category);
      const barY = yMax - barHeight;
      return (
        <Bar
          key={`bar-${category}`}
          x={barX}
          y={barY}
          width={barWidth}
          height={barHeight}
          fill="rgba(23, 233, 217, .5)"
          onClick={event => {
            alert(`clicked: ${JSON.stringify(Object.values(d))}`);
          }}
        />
      );
    })}
  </Group>
</svg>
:null



  
  return (
    
    <div className="bar_chart">
     {barChart}
    </div>
   );
};
  
