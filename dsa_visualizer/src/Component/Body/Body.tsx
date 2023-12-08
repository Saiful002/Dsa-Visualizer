import React from 'react'
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { BarChart } from '@mui/x-charts/BarChart';
interface props{
    arr:any,
    value:any
}

const Body = (props:props) => {
const {arr,value}=props

    const [skipAnimation, setSkipAnimation] = React.useState(false);
  
console.log(typeof(arr))
console.log(arr)

const highlightScope = {
    highlighted: 'series',
    faded: 'global',
  } as const;
  
  const series = [
    {
      label: 'series 1',
      data: 
        arr
      ,
    },
  ].map((s) => ({ ...s, highlightScope }));



    
  return (
    <Box sx={{ width: '100%' }}>
    <BarChart
      height={300}
      series={series
        .map((s:any) => ({ ...s, data: s.data.slice(0, value) }))
        .slice(0, 1)
    }
        
      skipAnimation={skipAnimation}
    />
    <FormControlLabel
      checked={skipAnimation}
      control={
        <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
      }
      label="skipAnimation"
      labelPlacement="end"
    />
  
  </Box>
  )
}


export default Body