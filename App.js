import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import React from 'react';
import Routes from './src/routes';
import MeuContextoProvidender from './src/context/UserContext';


export default function App() {
  return (
    <NavigationContainer>
        <MeuContextoProvidender>
          <StatusBar backgroundColor="#0EACBC" barStyle="light-content" />
          <Routes />
        </MeuContextoProvidender>
    </NavigationContainer>
  );
}

