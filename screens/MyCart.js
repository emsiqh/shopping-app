import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { COLOURS, Items } from '../database/Database';
import Toast from 'react-native-root-toast';
import { CheckoutInfo } from '../components';

const MyCart = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from local DB by ID
  const getDataFromDB = async () => {
    try {
      const items = await AsyncStorage.getItem('cartItems');
      const parsedItems = JSON.parse(items);
      const productData = Items.filter(data => parsedItems && parsedItems.includes(data.id));
      setProduct(productData.length > 0 ? productData : false);
      getTotal(productData.length > 0 ? productData : false);
    } catch (error) {
      console.error(error);
    }
  };

  //get total price of all items in the cart
  const getTotal = productData => {
    const total = productData.reduce((acc, curr) => acc + curr.productPrice, 0);
    setTotal(total);
  };

  //remove data from Cart
  const removeItemFromCart = async (id) => {
    try {
      let itemArray = await AsyncStorage.getItem('cartItems');
      let array = JSON.parse(itemArray) || [];
      const index = array.indexOf(id);
      if (index !== -1) {
        array.splice(index, 1);
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        getDataFromDB();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //checkout
  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      return error;
    }
    Toast.show('Items will be Deliverd SOON!', Toast.SHORT);
    navigation.navigate('Home');
  };

  const renderProducts = (data, index) => {
    return (
      <TouchableOpacity
        key={data.key}
        onPress={() => navigation.navigate('ProductInfo', { productID: data.id })}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            source={data.productImage}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {data.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  maxWidth: '85%',
                  marginRight: 4,
                }}>
                &#8377;{data.productPrice}
              </Text>
              <Text>
                (~&#8377;
                {data.productPrice + data.productPrice / 20})
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(data.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLOURS.white,
          position: 'relative',
        }}>
        <ScrollView>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              paddingTop: 16,
              paddingHorizontal: 16,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.backgroundLight,
                  borderRadius: 12,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
              }}>
              Order Details
            </Text>
            <View></View>
          </View>
          <Text
            style={{
              fontSize: 20,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              paddingTop: 20,
              paddingLeft: 16,
              marginBottom: 10,
            }}>
            My Cart
          </Text>
          <View style={{ paddingHorizontal: 16 }}>
            {product ? product.map(renderProducts) : null}
          </View>
          <View>
            {/* Delivery location */}
            <CheckoutInfo
              type="icon"
              title="Delivery Location"
              sub1="Nam Tu Liem, Ha Noi"
              sub2="Trung Van"
            />

            {/* Payment method */}
            <CheckoutInfo
              type="string"
              title="Payment Method"
              sub1="Online Banking"
              sub2="******-2011"
            />

            {/* Order info */}
            <View
              style={{
                paddingHorizontal: 16,
                marginTop: 40,
                marginBottom: 80,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                  marginBottom: 20,
                }}>
                Order Info
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLOURS.black,
                    opacity: 0.5,
                  }}>
                  Subtotal
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: COLOURS.black,
                    opacity: 0.8,
                  }}>
                  &#8377;{total}.00
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 22,
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLOURS.black,
                    opacity: 0.5,
                  }}>
                  Shipping Tax
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    color: COLOURS.black,
                    opacity: 0.8,
                  }}>
                  &#8377;{total / 20}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: COLOURS.black,
                    opacity: 0.5,
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: COLOURS.black,
                  }}>
                  &#8377;{total + total / 20}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Checkout button */}
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            height: '8%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => (total != 0 ? checkOut() : null)}
            style={{
              width: '86%',
              height: '90%',
              backgroundColor: COLOURS.blue,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                letterSpacing: 1,
                color: COLOURS.white,
                textTransform: 'uppercase',
              }}>
              CHECKOUT (&#8377;{total + total / 20} )
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>

  );
};

export default MyCart;
