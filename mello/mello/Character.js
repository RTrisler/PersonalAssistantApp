import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { StyleSheet, Text, View } from 'react-native';

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className='app'>
        <div className='div'>
          <text>fart</text>
        <LinearProgress variant="determinate" value={progress} />
          <button 
            onClick={()=>
            this.updateProgress('percent', this.state.percent + .1)
          }>add</button>
        </div>
      </div>
  );
}
