import { AlertCircle, CheckCircle2 } from 'lucide-react-native';
import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';

type ToastType = 'success' | 'error';

interface ToastContextProps {
    showToast: (message: string, type: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);
    const translateY = useRef(new Animated.Value(-100)).current;
    const opacity = useRef(new Animated.Value(0)).current;
    const insets = useSafeAreaInsets();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const hideToast = useCallback(() => {
        Animated.parallel([
            Animated.timing(translateY, {
                toValue: -100,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setToast(null);
        });
    }, [opacity, translateY]);

    const showToast = useCallback((message: string, type: ToastType) => {
        setToast({ message, type });

        // Reset
        translateY.setValue(-100);
        opacity.setValue(0);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        // Animate in
        Animated.parallel([
            Animated.spring(translateY, {
                toValue: insets.top + 10,
                useNativeDriver: true,
                speed: 12,
                bounciness: 8,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();

        // Animate out after 3.5 seconds
        timeoutRef.current = setTimeout(() => {
            hideToast();
        }, 3500);
    }, [insets.top, opacity, translateY, hideToast]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast && (
                <Animated.View
                    style={[
                        styles.toastContainer,
                        {
                            transform: [{ translateY }],
                            opacity,
                        }
                    ]}
                >
                    <View style={[styles.toastContent, toast.type === 'error' ? styles.errorBg : styles.successBg]}>
                        {toast.type === 'success' ? (
                            <CheckCircle2 size={20} color={Colors.white} />
                        ) : (
                            <AlertCircle size={20} color={Colors.white} />
                        )}
                        <Text style={styles.toastText}>{toast.message}</Text>
                    </View>
                </Animated.View>
            )}
        </ToastContext.Provider>
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        position: 'absolute',
        top: 0,
        left: 20,
        right: 20,
        zIndex: 9999,
        alignItems: 'center',
    },
    toastContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 24,
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 6,
        minWidth: '70%',
        maxWidth: '100%',
    },
    successBg: {
        backgroundColor: '#2ecc71',
    },
    errorBg: {
        backgroundColor: Colors.danger,
    },
    toastText: {
        color: Colors.white,
        fontSize: 15,
        fontWeight: 'bold',
        flexShrink: 1,
    }
});
