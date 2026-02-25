import React from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Colors } from '../../../constants/Colors';

interface InputProps extends TextInputProps {
    label?: string;
    error?: string;
    required?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    showCounter?: boolean;
    rightIcon?: React.ReactNode;
}

export const CustomInput: React.FC<InputProps & { leftIcon?: React.ReactNode }> = ({
    label,
    error,
    required,
    containerStyle,
    leftIcon,
    rightIcon,
    showCounter,
    ...props
}) => {
    const charCount = props.value?.length || 0;

    return (
        <View style={[styles.container, containerStyle]}>
            {label && (
                <Text style={styles.label}>
                    {label} {required && <Text style={styles.required}>*</Text>}
                </Text>
            )}
            <View style={styles.inputWrapper}>
                {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
                <TextInput
                    style={[
                        styles.input,
                        props.multiline ? styles.multilineInput : null,
                        error ? styles.inputError : null,
                        props.editable === false ? styles.disabled : null,
                        leftIcon ? styles.inputWithIcon : null,
                        rightIcon ? styles.inputWithRightIcon : null,
                        props.style,
                    ]}
                    placeholderTextColor="#A9A9A9"
                    {...props}
                />
                {rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>}
            </View>
            <View style={styles.footerRow}>
                {error ? <Text style={styles.errorText}>{error}</Text> : <View />}
                {showCounter && props.maxLength && (
                    <Text style={styles.counterText}>
                        {charCount}/{props.maxLength}
                    </Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 12,
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.black,
        marginBottom: 8,
        marginLeft: 8,
    },
    required: {
        color: Colors.danger,
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    iconContainer: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    input: {
        minHeight: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 24,
        paddingHorizontal: 18,
        fontSize: 16,
        color: Colors.black,
        backgroundColor: Colors.white,
    },
    inputWithIcon: {
        paddingLeft: 45,
    },
    multilineInput: {
        minHeight: 80,
        paddingTop: 12,
        paddingBottom: 12,
        textAlignVertical: 'top',
    },
    inputWithRightIcon: {
        paddingRight: 45,
    },
    rightIconContainer: {
        position: 'absolute',
        right: 15,
        zIndex: 1,
    },
    inputError: {
        borderColor: Colors.danger,
    },
    disabled: {
        backgroundColor: '#F5F5F5',
        color: '#A9A9A9',
        borderColor: '#E0E0E0',
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingHorizontal: 8,
    },
    errorText: {
        color: Colors.danger,
        fontSize: 12,
    },
    counterText: {
        color: '#7F8C8D',
        fontSize: 12,
    },
});
