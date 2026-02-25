import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/Colors';

interface BackButtonProps {
    onPress?: () => void;
    color?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onPress, color = Colors.black }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        if (onPress) {
            onPress();
        } else {
            navigation.goBack();
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
            <ChevronLeft size={28} color={color} strokeWidth={2.5} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        marginLeft: -8,
    },
});
