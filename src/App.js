import { useState, useEffect } from 'react';
import ChartComp from './components/ChartComp'
import MatDataTable from './components/MatDataTable';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import './App.css';

const rawData = [
  {label: 'Q1_2021', aValue: 40},
  {label: 'Q2_2021', aValue: 14},
  {label: 'Q3_2021', aValue: 22},
  {label: 'Q4_2021', aValue: 43},
  {label: 'Q1_2022', aValue: 46},
  {label: 'Q2_2022', aValue: 29},
  {label: 'Q3_2022', aValue: 30},
  {label: 'Q4_2022', aValue: 37},
];


export default function App() {  
  const [ chartData, setChartData ] = useState([])  
  const [ isLoaded, setIsLoaded ] =  useState(false);
  const [ isDataChanged, setIsDataChanged ] =  useState(true);

  useEffect(() => {
      setIsLoaded(false)
      setChartData(rawData)
      setTimeout(() => {
          setIsLoaded(true)    
      }, 100);
  }, []);

  const onHandleChange  = (data) => {
      setIsDataChanged(false)
      setChartData(data)
      setTimeout(() => {
      setIsDataChanged(true)    
    }, 100);
  }

  return (
    <div className="App">
        <Box sx={{ flexGrow: 1, marginTop: 12 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={1}>
              
            </Grid>
            <Grid item xs={6} md={6}>
              {isLoaded &&
                  <ChartComp data={chartData} onHandleChange={onHandleChange}/>
              }
            </Grid>
            <Grid item xs={6} md={4}>
                <MatDataTable data={chartData}/>
            </Grid>
          </Grid>
        </Box>
      
      
    </div>
  );
}