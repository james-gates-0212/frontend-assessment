import { Card, CssBaseline, Grid } from '@mui/material';
import React from 'react';
import { Provider } from 'react-redux';
import Scrollbar from 'react-smooth-scrollbar-z';
import configureStore from './modules/store';
import Students from './views/Students';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Grid container justifyContent="center" bgcolor="#dbdbdb" py={3} sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }}>
        <Grid item xs={12} sm={8} md={6} lg={6} py={3} px={3} sx={{
          height: '100%',
        }}>
          <Card sx={{
            height: '100%',
            borderRadius: '10px',
          }}>
            <Students />
          </Card>
        </Grid>
      </Grid>
    </Provider>
  );
}

export default App;
