import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { addCartItems, removeCartItems } from '../features/counter/ProductCounterSlice';
import { ADD_TO_CART, PRODUCTS, REMOVE_CART } from '../common /constrants/Text';
import { GOGGLES, PHONE, SHIRT, SHOES, WATCH, PRODUCTS_CONTAINER } from '../asset/Images';
import { useEffect, useState } from 'react';
import { GOGGLES_FRAME, GOGGLES_SPRAY } from '../asset/Images';
import { GOGGLES_COVER } from '../asset/Images';
import { WATCH_STRAP } from '../asset/Images';
import { PHONE_COVER } from '../asset/Images';
import { PHONE_GLASS } from '../asset/Images';
import { SHIRT_HANGER } from '../asset/Images';
import { SHOES_BOX } from '../asset/Images';
import { SHOES_POLISH } from '../asset/Images';
import { WATCH_BOX } from '../asset/Images';

const Products = () => {
    const navigation = useNavigation();
    const addedItems = useSelector(state => state.cart)
    // console.log(addedItems);

    const [pressedItem, setPressedItem] = useState({})

    const dispatch = useDispatch();

    const productList = [
        {
            id: 1,
            name: 'Goggles',
            prize: '500',
            imageSource: GOGGLES,
            qty: 1,
            subProducts: [
                {
                    id: 11,
                    name: 'Cover',
                    prize: '200',
                    imageSource: GOGGLES_COVER,
                    qty: 0,
                },
            ]
        },
        {
            id: 2,
            name: 'iPhone 13',
            prize: '5000',
            imageSource: PHONE,
            qty: 1,
            subProducts: [
                {
                    id: 12,
                    name: 'Cover',
                    prize: '350',
                    imageSource: PHONE_COVER,
                    qty: 0,
                },
            ]
        },
        {
            id: 3,
            name: 'Shirt',
            prize: '400',
            imageSource: SHIRT,
            qty: 1,
            subProducts: [
                {
                    id: 13,
                    name: 'Hanger',
                    prize: '300',
                    imageSource: SHIRT_HANGER,
                    qty: 0,
                },
            ]
        },
        {
            id: 4,
            name: 'Shoes',
            prize: '900',
            imageSource: SHOES,
            qty: 1,
            subProducts: [
                {
                    id: 14,
                    name: 'Box',
                    prize: '200',
                    imageSource: SHOES_BOX,
                    qty: 0,
                },
            ]
        },
        {
            id: 5,
            name: 'Apple Watch',
            prize: '1200',
            imageSource: WATCH,
            qty: 1,
            subProducts: [
                {
                    id: 15,
                    name: 'Box',
                    prize: '250',
                    imageSource: WATCH_BOX,
                    qty: 0,
                },
            ]
        },
    ];


    useEffect(() => {
        const initialPressedState = {};
        addedItems.forEach(item => {
            initialPressedState[item.id] = true;
        });
        setPressedItem(initialPressedState);
    }, [addedItems]);

    const isItemInCart = (itemId) => {
        return addedItems.some(item => item.id === itemId);
    }

    const onPressButton = (item) => {
        const isInCart = isItemInCart(item.id);

        if (isInCart) {
            dispatch(removeCartItems(item.id));
        } else {
            dispatch(addCartItems(item));
        }
        setPressedItem(prev => ({ ...prev, [item.id]: !prev[item.id] }));
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: 60, alignItems: 'flex-end', justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddedProducts')}
                    style={styles.buttonStyle}>
                    <Image
                        style={{ height: 35, width: 35 }}
                        source={PRODUCTS_CONTAINER} />
                </TouchableOpacity>
                {addedItems.length > 0 && (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('AddedProducts')}
                        style={styles.addedItemsView}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>{addedItems.length}</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15 }}>{PRODUCTS}</Text>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={productList}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={styles.childView}>
                                <View style={{ height: 130, width: 360, flexDirection: 'row' }}>
                                    <Image
                                        style={{ height: 130, width: 120, borderRadius: 10 }}
                                        source={item.imageSource} />
                                    <View style={{ justifyContent: 'center', marginLeft: 15 }}>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Name: {item.name}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>Prize: ${item.prize}</Text>
                                        <TouchableOpacity
                                            onPress={() => onPressButton(item)}
                                            style={[styles.buttonStyle2, {
                                                backgroundColor: pressedItem[item.id] ? 'red' : 'green'
                                            }]}>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>{pressedItem[item.id] ? REMOVE_CART : ADD_TO_CART}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )} />
            </View>
        </View>
    );
}

export default Products;

const styles = StyleSheet.create({
    buttonStyle: {
        height: 50,
        width: 50,
        backgroundColor: '#41B3A2',
        marginRight: 15,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addedItemsView: {
        height: 25,
        width: 25,
        backgroundColor: 'red',
        position: 'absolute',
        right: 16,
        top: 0,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    childView: {
        backgroundColor: '#9DBDFF',
        width: 400,
        height: 180,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonStyle2: {
        height: 50,
        width: 150,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 1
    },
});