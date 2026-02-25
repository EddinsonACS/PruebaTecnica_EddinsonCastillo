import { Check, ChevronRight, FileEdit, Heart, Settings2 } from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/Colors';

const { width } = Dimensions.get('window');

const ONBOARDING_DATA = [
    {
        id: 1,
        title: 'Postulación',
        subtitle: 'Semi-Senior/Senior React Native Developer.',
        Icon: FileEdit,
    },
    {
        id: 2,
        title: 'Fase #3',
        subtitle: 'Evaluación técnica de arquitectura y estándares profesionales.',
        Icon: Settings2,
    },
    {
        id: 3,
        title: 'Agradecimientos',
        subtitle: 'Por espacio otorgado para demostrar mi potencial.',
        Icon: Heart,
    },
];

export const OnboardingScreen = ({ navigation }: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const insets = useSafeAreaInsets();

    const handleNext = () => {
        if (currentIndex < ONBOARDING_DATA.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            navigation.replace('Home');
        }
    };

    const handleScroll = (event: any) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffsetX / width);
        setCurrentIndex(index);
    };

    const isLastPage = currentIndex === ONBOARDING_DATA.length - 1;

    const renderItem = ({ item }: { item: any }) => (
        <View style={styles.slide}>
            <View style={styles.iconContainer}>
                <item.Icon size={100} color={Colors.black} strokeWidth={1.5} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
    );

    return (
        <View style={[styles.mainContainer, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            <View style={styles.container}>
                {/* Scrollable Content */}
                <FlatList
                    ref={flatListRef}
                    data={ONBOARDING_DATA}
                    renderItem={renderItem}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    keyExtractor={(item) => item.id.toString()}
                />

                {/* Footer refined with Dots and Button */}
                <View style={styles.footer}>
                    <View style={styles.pagination}>
                        {ONBOARDING_DATA.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    currentIndex === index && styles.activeDot,
                                ]}
                            />
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.button, isLastPage && styles.buttonStart]}
                        onPress={handleNext}
                        activeOpacity={0.8}
                    >
                        {isLastPage ? (
                            <View style={styles.buttonStartContent}>
                                <Text style={styles.buttonText}>Iniciar</Text>
                                <Check size={20} color={Colors.black} strokeWidth={3} style={styles.checkIcon} />
                            </View>
                        ) : (
                            <ChevronRight size={32} color={Colors.black} strokeWidth={2.5} />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
    },
    slide: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    iconContainer: {
        marginBottom: 40,
        backgroundColor: Colors.secondary,
        padding: 30,
        borderRadius: 40,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 2,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 18,
        color: Colors.black,
        opacity: 0.6,
        textAlign: 'center',
        lineHeight: 28,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 48,
        paddingBottom: 20,
        paddingTop: 20,
    },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.secondary,
        marginHorizontal: 4,
    },
    activeDot: {
        width: 30,
        backgroundColor: Colors.primary,
    },
    button: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonStart: {
        width: 150,
        borderRadius: 22,
    },
    buttonStartContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.black,
        fontSize: 20,
        fontWeight: '700',
    },
    checkIcon: {
        marginLeft: 8,
    },
});
