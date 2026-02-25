import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Skeleton } from './Skeleton';

export const ProductDetailSkeleton = () => {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.header}>
                <Skeleton width={180} height={20} borderRadius={4} style={styles.titleSkeleton} />
                <View style={styles.logoContainer}>
                    <Skeleton width={120} height={120} borderRadius={60} />
                </View>
            </View>

            <View style={styles.detailsContainer}>
                {/* 4 Inputs mimicking CustomInput in editable=false mode */}
                {[1, 2, 3, 4].map((_, idx) => (
                    <View key={idx} style={styles.inputWrapper}>
                        <Skeleton width={120} height={14} borderRadius={4} style={styles.labelSkeleton} />
                        <View style={styles.inputBox}>
                            <Skeleton width="100%" height={20} borderRadius={4} />
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
    header: {
        alignItems: 'center',
        marginBottom: 32,
    },
    logoContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#F5F6FA',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.secondary,
    },
    detailsContainer: {
        gap: 16,
    },
    inputWrapper: {
        marginBottom: 16,
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
    titleSkeleton: {
        marginBottom: 20,
    },
    labelSkeleton: {
        marginBottom: 8,
    }
});
