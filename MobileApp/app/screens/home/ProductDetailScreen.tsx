import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../../../components/Shared/Button/CustomButton';
import { CustomInput } from '../../../components/Shared/Forms/CustomInput';
import { CustomModal } from '../../../components/Shared/Modals/CustomModal';
import { ProductDetailSkeleton } from '../../../components/Shared/Skeletons/ProductDetailSkeleton';
import { Colors } from '../../../constants/Colors';
import { useToast } from '../../../contexts/ToastContext';
import { ProductService } from '../../../services/ProductService';

export const ProductDetailScreen = ({ route, navigation }: any) => {
    const { product } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [isScreenReady, setIsScreenReady] = useState(false);
    const insets = useSafeAreaInsets();
    const { showToast } = useToast();

    useEffect(() => {
        const timer = setTimeout(() => setIsScreenReady(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const success = await ProductService.deleteProduct(product.id);
            if (success) {
                setModalVisible(false);
                showToast('¡Producto eliminado con éxito!', 'success');
                navigation.navigate('Home', { refresh: true });
            } else {
                showToast('No se pudo eliminar el producto', 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Ocurrió un error al eliminar', 'error');
        } finally {
            setDeleting(false);
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        const datePart = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr.substring(0, 10);
        const parts = datePart.split('-');
        if (parts.length !== 3) return datePart;
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
    };

    return (
        <View style={styles.container}>
            {!isScreenReady ? (
                <ProductDetailSkeleton />
            ) : (
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        { paddingTop: insets.top + 90 } // increased top padding from 70 to 90
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={styles.idTitle}>ID: {product.id}</Text>
                        <Text style={styles.infoSubtitle}>Información extra</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.logoSection}>
                            <View style={styles.logoCircle}>
                                <Image source={{ uri: product.logo }} style={styles.logoImage} resizeMode="cover" />
                            </View>
                            <Text style={styles.logoLabel}>Logo</Text>
                        </View>

                        <CustomInput
                            label="Nombre"
                            value={product.name}
                            editable={false}
                        />

                        <CustomInput
                            label="Descripción"
                            value={product.description}
                            multiline
                            editable={false}
                        />

                        <CustomInput
                            label="Fecha Liberación"
                            value={formatDate(product.date_release)}
                            editable={false}
                        />

                        <CustomInput
                            label="Fecha Revisión"
                            value={formatDate(product.date_revision)}
                            editable={false}
                        />
                    </View>
                </ScrollView>
            )}

            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
                <CustomButton
                    title="Eliminar"
                    variant="danger"
                    onPress={() => setModalVisible(true)}
                    style={styles.flexButton}
                />
                <CustomButton
                    title="Editar"
                    variant="primary"
                    onPress={() => navigation.navigate('ProductForm', { product })}
                    style={styles.flexButton}
                />
            </View>

            <CustomModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={handleDelete}
                message={`¿Estás seguro de eliminar el producto ${product.name}?`}
                loading={deleting}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContent: {
        paddingHorizontal: 30,
        paddingTop: 40,
        paddingBottom: 100,
    },
    header: {
        marginBottom: 40,
    },
    idTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.black,
        fontStyle: 'italic',
    },
    infoSubtitle: {
        fontSize: 16,
        color: '#7F8C8D',
        marginTop: 4,
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 10,
    },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.secondary,
        overflow: 'hidden',
    },
    logoImage: {
        width: '100%',
        height: '100%',
    },
    logoLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: Colors.black,
        marginTop: 8,
    },
    formContainer: {
        gap: 0,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 8,
        gap: 12,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.secondary,
        zIndex: 10,
    },
    flexButton: {
        flex: 1,
    },
});
