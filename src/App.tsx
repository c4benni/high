import React, { useEffect } from 'react';
import './App.css';
import Form from './components/Form/Form';
import Button from './components/Inputs/Button/Button';
import TextField from './components/Inputs/TextField/TextField';
import { AppLogo } from './components/Logo/appLogo';
import Breakpoint from './utils/breakpoints';

function App() {
  useEffect(() => {
    window.Breakpoint = Breakpoint;
  }, [])
  return (
    <div className="App grid items-start">
      <header className="App-header ">
        <AppLogo />

        <Form
          name='sign-in'
          submitText='Sign in'
        >
          <TextField
            label='Username'
          />

          <TextField
            type='password'
            label='Password'
          />
        </Form>

        <Button tag='span' primary>
          Hello Button
        </Button>
      </header>
    </div>
  );
}

export default App;
