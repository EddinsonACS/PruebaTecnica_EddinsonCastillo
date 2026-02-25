import { Search } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { CustomInput } from './CustomInput';

interface SearchInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    containerStyle?: ViewStyle;
}

export const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChangeText,
    placeholder = 'Buscar...',
    containerStyle
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <CustomInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                containerStyle={styles.inputContainer}
                leftIcon={<Search size={20} color="#A9A9A9" />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 0,
        borderRadius: 24,
    },
});
