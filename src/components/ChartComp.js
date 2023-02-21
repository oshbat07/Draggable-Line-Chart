import React, { useState, useEffect } from 'react'
import { Line } from "react-chartjs-2";
import 'chartjs-plugin-dragdata'
  

export default function ChartComp(props) {
  const [ shouldRedraw ] = useState(false);  
  const [ isLoaded, setIsLoaded ] =  useState(false);
  const [ isPlugin, setIsPlugin ] =  useState({});


  const buildLineDataSet = (data) => {      
    let labels = data.map(c => c.label);
    let options = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
        {
          label: 'UE Index',
          data: data.map(c => c.aValue),
            //datasetIndex: data.map(c => c.Id),
            fill: false,
            tension: 0.4,
            borderWidth: 1,
            borderColor: 'darkred',
            backgroundColor: 'rgb(255, 230, 230)',
            pointHitRadius: 25
          },
          ]
      },
      options: {
        scales: {
          y: {
            min: 0,
            max: 80
          }
        },
        onHover: function(e) {
          const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
          if (point.length) e.native.target.style.cursor = 'grab'
          else e.native.target.style.cursor = 'default'
        },
        plugins: {
          dragData: {
            round: 1,
            showTooltip: true,
            onDragStart: function(e, element) {
            },
            onDrag: function(e, datasetIndex, index, value) {              
              e.target.style.cursor = 'grabbing'
            },
            onDragEnd: function(e, datasetIndex, index, value) {  
              e.target.style.cursor = 'default' 
                            
              if(datasetIndex === 0) {
                props.data[index].aValue = value
              }
      
              if(datasetIndex === 1) {
                props.data[index].bValue = value
              }
      
              props.onHandleChange(props.data);
            },
          }
        }
          // 
      }
    }
    return options
  }
 
  let localOption= buildLineDataSet(props.data);

  useEffect(() => {    
    console.log(localOption.options)    
    setTimeout(() => {
      setIsLoaded(true)
    }, 200);
  }, [])
const handleclick= (type) => {
  if(type === 'fix') {
    setIsPlugin({})
  } else {
    setIsPlugin(localOption.plugins)
  }
}
  return (
    <div>
      <button onClick={() => handleclick("fix")}>FIX LINE</button>
      <button onClick={() => handleclick()}>EDIT LINE</button>
      {isLoaded &&
        <Line
            redraw={shouldRedraw}
            data={localOption.data}
            options={localOption.options}
            plugins={localOption.plugins}          
        />
      }
    </div>
  );
}
