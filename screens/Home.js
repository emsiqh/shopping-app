import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLOURS, Items } from '../database/Database';
import { ItemContainer, ProductCard } from '../components';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [accessory, setAccessory] = useState([]);

  //get called on screen loads
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from DB
  const getDataFromDB = () => {
    let productList = [];
    let accessoryList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == 'product') {
        productList.push(Items[index]);
      } else if (Items[index].category == 'accessory') {
        accessoryList.push(Items[index]);
      }
    }

    setProducts(productList);
    setAccessory(accessoryList);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLOURS.white,
        }}>
        <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}>
            <TouchableOpacity>
              <Entypo
                name="shopping-bag"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundDark,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
              <MaterialCommunityIcons
                name="cart"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundDark,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 10,
              padding: 16,
            }}>
            <Text
              style={{
                fontSize: 26,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 10,
              }}>
              Hi-Fi Shop &amp; Service
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: '400',
                letterSpacing: 1,
                lineHeight: 24,
              }}>
              Audio shop on Rustaveli Ave 57.
              {'\n'}This shop offers both products and services
            </Text>
          </View>

          {/* Products */}
          <ItemContainer title={"Products"} quantity={15} item={products} />

          {/* Accessories */}
          <ItemContainer title={"Accessories"} quantity={51} item={accessory} />
        </ScrollView>
      </View>
    </SafeAreaView>

  );
};

export default Home;
