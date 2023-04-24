import React from 'react';
import { View, Text } from 'react-native';

import { COLOURS } from '../database/Database';
import ProductCard from './ProductCard';

const ItemContainer = ({ title, quantity, item }) => {
    return (
        <View
            style={{
                padding: 16,
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: COLOURS.black,
                            fontWeight: '500',
                            letterSpacing: 1,
                        }}>
                        {title}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: COLOURS.black,
                            fontWeight: '400',
                            opacity: 0.5,
                            marginLeft: 10,
                        }}>
                        {quantity}
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 14,
                        color: COLOURS.blue,
                        fontWeight: '400',
                    }}>
                    SeeAll
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}>
                {item.map(data => {
                    return <ProductCard data={data} key={data.id} />;
                })}
            </View>
        </View>
    )
}

export default ItemContainer