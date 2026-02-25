import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { Skeleton } from './Skeleton';

export const ProductListSkeleton = () => {
    // Generate 4 skeleton items to fill the screen
    const items = Array.from({ length: 4 }, (_, i) => i);

    return (
        <View style={styles.container}>
            {items.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.cardWrapper,
                        index === 0 && styles.firstCard,
                        index === items.length - 1 && styles.lastCard
                    ]}
                >
                    <View style={styles.content}>
                        <View style={styles.textContainer}>
                            <Skeleton width={150} height={18} borderRadius={4} style={styles.titleSkeleton} />
                            <Skeleton width={100} height={14} borderRadius={4} />
                        </View>
                        <Skeleton width={20} height={20} borderRadius={10} />
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cardWrapper: {
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderTopWidth: 0,
        backgroundColor: Colors.white,
    },
    firstCard: {
        borderTopWidth: 1,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        overflow: 'hidden',
    },
    lastCard: {
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        overflow: 'hidden',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    textContainer: {
        flex: 1,
    },
    titleSkeleton: {
        marginBottom: 8,
    }
});
