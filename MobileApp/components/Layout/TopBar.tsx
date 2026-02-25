import { Landmark } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { BackButton } from '../Shared/Button/BackButton';

interface TopBarProps {
    showBack?: boolean;
    title?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ showBack, title }) => {
    return (
        <View style={styles.container}>
            {showBack && (
                <View style={styles.backButtonContainer}>
                    <BackButton />
                </View>
            )}

            {title ? (
                <View style={styles.centerContainer}>
                    <Text style={styles.headerTitle}>{title}</Text>
                </View>
            ) : (
                <View style={styles.logoContainer}>
                    <Landmark size={24} color={Colors.black} strokeWidth={2.5} />
                    <Text style={styles.logoText}>BANCO</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: Colors.secondary,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonContainer: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
        letterSpacing: 1,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
});
