import { X } from 'lucide-react-native';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/Colors';
import { CustomButton } from '../Button/CustomButton';

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message: string;
    confirmTitle?: string;
    cancelTitle?: string;
    loading?: boolean;
}

export const CustomModal: React.FC<CustomModalProps> = ({
    visible,
    onClose,
    onConfirm,
    message,
    confirmTitle = 'Confirmar',
    cancelTitle = 'Cancelar',
    loading = false
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <X size={24} color={Colors.black} />
                    </TouchableOpacity>

                    <View style={styles.body}>
                        <Text style={styles.message}>{message}</Text>
                    </View>

                    <View style={styles.footer}>
                        <CustomButton
                            title={cancelTitle}
                            onPress={onClose}
                            style={styles.button}
                        />
                        <CustomButton
                            title={confirmTitle}
                            onPress={onConfirm}
                            loading={loading}
                            variant="danger"
                            style={styles.button}
                        />

                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        paddingBottom: 40,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 8,
    },
    body: {
        marginVertical: 32,
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        color: Colors.black,
        textAlign: 'center',
        fontWeight: '600',
    },
    footer: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 18,
    },
    button: {
        flex: 1,
    },
});
