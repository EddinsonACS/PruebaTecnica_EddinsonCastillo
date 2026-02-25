import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { TopBar } from '../components/Layout/TopBar';
import { Colors } from '../constants/Colors';
import { NAVIGATION_CONFIG } from '../constants/Config';
import { ToastProvider } from '../contexts/ToastContext';
import { RootNavigator } from './navigation/RootNavigator';

const navigationRef = createNavigationContainerRef();

const AppContent = () => {
    const insets = useSafeAreaInsets();
    const [showTopBar, setShowTopBar] = React.useState(false);
    const [showBack, setShowBack] = React.useState(false);
    const [headerTitle, setHeaderTitle] = React.useState<string | undefined>(undefined);

    const updateHeaderState = () => {
        const currentRouteName = navigationRef.getCurrentRoute()?.name;
        if (currentRouteName) {
            setShowTopBar(!NAVIGATION_CONFIG.HIDDEN_TOPBAR_ROUTES.includes(currentRouteName));
            setShowBack(NAVIGATION_CONFIG.BACK_BUTTON_ROUTES.includes(currentRouteName));
            setHeaderTitle(NAVIGATION_CONFIG.SCREEN_TITLES[currentRouteName]);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />

            <View style={styles.navContainer}>
                <NavigationContainer
                    ref={navigationRef}
                    onReady={updateHeaderState}
                    onStateChange={updateHeaderState}
                >
                    <View style={styles.navContainer}>
                        <RootNavigator />
                    </View>

                    {showTopBar && (
                        <View style={styles.topBarContainer}>
                            <View style={{ height: insets.top, backgroundColor: Colors.white }} />
                            <TopBar showBack={showBack} title={headerTitle} />
                        </View>
                    )}
                </NavigationContainer>
            </View>
        </View>
    );
};

const App = () => {
    return (
        <SafeAreaProvider>
            <ToastProvider>
                <AppContent />
            </ToastProvider>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    navContainer: {
        flex: 1,
    },
    topBarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
    },
});

export default App;
