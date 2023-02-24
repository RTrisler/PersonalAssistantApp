import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { StyleSheet, Text, View } from 'react-native';
import { createTheme } from '@mui/material/styles';
import { LinearGradient } from 'expo-linear-gradient';

const BGColor = "#004052"
export default function LinearDeterminate() {

const [progress, setProgress] = React.useState(0);
const [level, setLevel] = React.useState(0);


  return (
    <div className='app'>
        <div className='div'>
          
          <LinearProgress variant="determinate" value={progress} color='success' 
          sx={{
            width: 300,
          }}/>

          <button 
            onClick={()=>{ 
              setProgress((oldProgress) => {
                  setProgress(oldProgress+10)
                  if (oldProgress === 100){
                    setLevel(level+1)
                    return 0; 
                  }
                
              });
          }}>add</button> <text>Your level is: {level}</text>
        
        </div>
      </div>
      
  );
}

