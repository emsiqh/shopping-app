import React from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLOURS } from '../database/Database';;

const CheckoutInfo = ({ title, type, sub1, sub2 }) => {
    return (
        <View
            style={{
                paddingHorizontal: 16,
                marginVertical: 10,
            }}>
            <Text
                style={{
                    fontSize: 16,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    marginBottom: 20,
                }}>
                {title}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        width: '80%',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            color: COLOURS.blue,
                            backgroundColor: COLOURS.backgroundLight,
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            borderRadius: 10,
                            marginRight: 18,
                        }}>
                        <Text
                            style={{
                                fontSize: 10,
                                fontWeight: '900',
                                color: COLOURS.blue,
                                letterSpacing: 1,
                            }}>
                            {type === 'string' ? (
                                <Text
                                    style={{
                                        fontSize: 12,
                                        fontWeight: '900',
                                        color: COLOURS.blue,
                                        letterSpacing: 1,
                                    }}>
                                    PAYMENT
                                </Text>
                            ) : (
                                <MaterialCommunityIcons
                                    name="truck-delivery-outline"
                                    style={{
                                        fontSize: 24,
                                        color: COLOURS.blue,
                                    }}
                                />
                            )}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                fontSize: 16,
                                color: COLOURS.black,
                                fontWeight: '500',
                            }}>
                            {sub1}
                        </Text>
                        <Text
                            style={{
                                fontSize: 15,
                                color: COLOURS.black,
                                fontWeight: '400',
                                lineHeight: 20,
                                opacity: 0.5,
                            }}>
                            {sub2}
                        </Text>
                    </View>
                </View>
                <MaterialCommunityIcons
                    name="chevron-right"
                    style={{ fontSize: 22, color: COLOURS.black }}
                />
            </View>
        </View>
    )
}

export default CheckoutInfo