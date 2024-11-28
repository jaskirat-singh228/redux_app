import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-native';
import Products from './Products';
import Counter from './Counter';
import { persistor, productStore } from '../redux/PoductStore';
import { PersistGate } from 'redux-persist/integration/react';

const ProviderSetup = () => (
    <SafeAreaView style={{ flex: 1 }}>
        <Provider store={productStore}>
            <PersistGate loading={null} persistor={persistor}>
                {/* <Counter /> */}
                <Products />
            </PersistGate>
        </Provider>
    </SafeAreaView>
);

export default ProviderSetup;
