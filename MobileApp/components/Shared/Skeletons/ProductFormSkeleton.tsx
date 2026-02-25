import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Skeleton } from './Skeleton';

export const ProductFormSkeleton = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Skeleton width={180} height={24} borderRadius={4} style={styles.titleSkeleton} />

            <View style={styles.formContainer}>
                {[1, 2, 3, 4, 5].map((_, idx) => (
                    <View key={idx} style={styles.inputWrapper}>
                        <Skeleton width={130} height={14} borderRadius={4} style={styles.labelSkeleton} />
                        <View style={[styles.inputBox, idx === 2 && styles.inputBoxTall]}>
                            <Skeleton width="100%" height={idx === 2 ? 80 : 20} borderRadius={4} />
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: 40,
    },
    formContainer: {
        marginVertical: 16,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputBox: {
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderRadius: 24,
        paddingHorizontal: 18,
        height: 50,
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    footer: {
        marginTop: 24,
        gap: 12,
    },
    buttonSkeleton: {
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.primary + '80', // semi-transparent yellow
        borderWidth: 1,
        borderColor: Colors.secondary,
    },
    titleSkeleton: {
        marginBottom: 32,
    },
    labelSkeleton: {
        marginBottom: 8,
    },
    inputBoxTall: {
        height: 100,
    }
});
