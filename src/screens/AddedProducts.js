import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItems, updateCartItemQuantity } from '../features/counter/ProductCounterSlice';
import { ARROW, GOGGLES, PHONE, SHIRT, SHOES, WATCH } from '../asset/Images';
import { ADDED_PRODUCTS, REMOVE } from '../common /constrants/Text';
import { useNavigation } from '@react-navigation/native';
import { ARROW_DOWN } from '../asset/Images';
import { GOGGLES_COVER } from '../asset/Images';
import { PHONE_COVER } from '../asset/Images';
import { SHIRT_HANGER } from '../asset/Images';
import { SHOES_BOX } from '../asset/Images';
import { WATCH_BOX } from '../asset/Images';

const AddedProducts = () => {
  const navigation = useNavigation()
  const addedItems = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [expandedItems, setExpandedItems] = useState({});

  const productImages = {
    1: GOGGLES,
    2: PHONE,
    3: SHIRT,
    4: SHOES,
    5: WATCH
  };


  const handleRemove = (id) => {
    dispatch(removeCartItems(id));
  };

  const totalPrize = () => {
    let total = 0;
    addedItems.map(item => {
      total = total + item.qty * item.prize
    })
    return total;
  }

  const onPressMinus = (item) => {
    if (item.qty > 1) {
      dispatch(updateCartItemQuantity({ id: item.id, qty: item.qty - 1 }));

    }
  };

  const onPressPlus = (item) => {
    dispatch(updateCartItemQuantity({ id: item.id, qty: item.qty + 1 }));
  }

  const onPressSubProductsMinus = (subProduct) => {
    if (subProduct.qty > 0) {
      dispatch(updateCartItemQuantity({ id: subProduct.id, qty: subProduct.qty - 1, isSubProduct: true }));
    }
  };

  const onPressSubProductsPlus = (subProduct) => {
    dispatch(updateCartItemQuantity({ id: subProduct.id, qty: subProduct.qty + 1, isSubProduct: true }))
  };

  const onPressDownArrow = (id) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const renderSubProduct = (subProducts, index) => (
    <View style={styles.subProductContainer}>
      <View style={styles.subProductTextView}>
        <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: 'bold' }}>Name: {subProducts.name}</Text>
        <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: 'bold', marginTop: 5 }}>Prize: ${subProducts.qty == 0 ? subProducts.prize : subProducts.prize * subProducts.qty}</Text>
        <View style={{ height: 28, marginTop: 5, flexDirection: 'row', }}>
          <TouchableOpacity
            onPress={() => onPressSubProductsMinus(subProducts)}
            style={styles.pulsMinus}>
            <Text style={styles.pulsMinusText}>-</Text>
          </TouchableOpacity>
          <Text style={[styles.pulsMinusText, { marginLeft: 12, color: 'black' }]}>{subProducts.qty}</Text>
          <TouchableOpacity
            onPress={() => onPressSubProductsPlus(subProducts)}
            style={[styles.pulsMinus, { marginLeft: 15 }]}>
            <Text style={styles.pulsMinusText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ height: 25, width: 25 }}
              source={ARROW}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15 }}>{ADDED_PRODUCTS}</Text>
        </View>
        <FlatList
          data={addedItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
              <View style={styles.itemContainer}>
                <Image
                  style={styles.imageStyle}
                  source={productImages[item.id]}
                />
                <View style={styles.infoContainer}>
                  <View style={{ flex: 0.7 }}>
                    <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: 'bold' }}>Name: {item.name}</Text>
                    <Text numberOfLines={1} style={{ fontSize: 20, fontWeight: 'bold', marginTop: 8 }}>Prize: ${item.qty == 1 ? item.prize : item.prize * item.qty}</Text>
                    <View style={{
                      height: 30,
                      marginTop: 8,
                      flexDirection: 'row',
                    }}>
                      <TouchableOpacity
                        onPress={() => onPressMinus(item)}
                        style={styles.pulsMinus}>
                        <Text style={styles.pulsMinusText}>-</Text>
                      </TouchableOpacity>
                      <Text style={[styles.pulsMinusText, { marginLeft: 15, color: 'black' }]}>{item.qty}</Text>
                      <TouchableOpacity
                        onPress={() => onPressPlus(item)}
                        style={[styles.pulsMinus, { marginLeft: 15 }]}>
                        <Text style={styles.pulsMinusText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={{ flex: 0.3, alignItems: 'center', }}>
                    <TouchableOpacity
                      onPress={() => onPressDownArrow(item.id)}
                      style={{ alignSelf: 'flex-end', marginRight: 5, padding: 8, marginRight: 8 }}>
                      <Image
                        style={{ height: 20, width: 20, tintColor: 'gray' }}
                        source={ARROW_DOWN}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemove(item.id)}>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>{REMOVE}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {expandedItems[item.id] && (
                <FlatList
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                  data={item.subProducts}
                  keyExtractor={subProducts => subProducts.id.toString()}
                  renderItem={({ item }) => renderSubProduct(item)}
                />
              )}
            </View>
          )}
        />
        {addedItems.length > 0 ? (
          <View style={{ backgroundColor: 'skyblue', height: 90 }}>
            <Text style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 10,
              marginLeft: 10
            }}>Total Products: {addedItems.length}</Text>
            <Text style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginLeft: 10,
              marginTop: 10,
            }}>Total Prize: ${totalPrize()}</Text>
          </View>
        ) : null}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',


  },
  imageStyle: {
    height: 100,
    width: 100,
    borderRadius: 10
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 40,
  },
  pulsMinus: {
    backgroundColor: 'green',
    height: 30,
    width: 30,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pulsMinusText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
  subProductContainer: {
    padding: 17,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 3,
    backgroundColor: '#DDDDDD',
    marginTop: 5
  },
  subProductTextView: {
    marginLeft: 10
  },
  subProductText: {
    fontSize: 20,
    fontWeight: '600'
  }
});

export default AddedProducts;
