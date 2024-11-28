import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { increment, decrement } from '../features/counter/CounterSlice';
import { COUNT, DECREMENT, INCREMENT } from '../common /constrants/Text';

const Counter = () => {
    const count = useSelector(state => state.counter.value); 
    const dispatch = useDispatch();

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <Text style={{ fontSize: 20 }}>{COUNT}: {count}</Text>
            <Button title={INCREMENT} onPress={() => dispatch(increment())} />
            <Button title={DECREMENT} onPress={() => dispatch(decrement())} />
        </View>
    );
};

export default Counter;
