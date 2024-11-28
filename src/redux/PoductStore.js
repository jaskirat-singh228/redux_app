import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PERSIST, persistReducer, persistStore } from "redux-persist";
import cartReducer from '../features/counter/ProductCounterSlice';
import AcyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AcyncStorage,
};

let rootReducer = combineReducers({
    cart: cartReducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);

const productStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [PERSIST]
            },
        })
});

const persistor = persistStore(productStore);

export { productStore, persistor };
