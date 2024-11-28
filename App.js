import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import ProviderSetup from './src/screens/ProviderSetup';
import AddedProducts from './src/screens/AddedProducts';
import {productStore} from './src/redux/PoductStore';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={productStore}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='ProviderSetup' component={ProviderSetup} />
          <Stack.Screen name='AddedProducts' component={AddedProducts} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
