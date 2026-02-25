import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ProductDetailScreen } from '../screens/home/ProductDetailScreen';
import { ProductFormScreen } from '../screens/home/ProductFormScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { SplashScreen } from '../screens/splash/SplashScreen';

export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Home: { refresh?: boolean } | undefined;
    ProductDetail: { product: any };
    ProductForm: { product?: any } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
                headerShown: false,
                animation: 'fade',
            }}
        >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="ProductForm" component={ProductFormScreen} />
        </Stack.Navigator>
    );
};
