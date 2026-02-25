import DateTimePicker from '@react-native-community/datetimepicker';
import { Calendar, Camera } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from '../../../components/Shared/Button/CustomButton';
import { CustomInput } from '../../../components/Shared/Forms/CustomInput';
import { ProductFormSkeleton } from '../../../components/Shared/Skeletons/ProductFormSkeleton';
import { Colors } from '../../../constants/Colors';
import { useToast } from '../../../contexts/ToastContext';
import { ProductService } from '../../../services/ProductService';

export const ProductFormScreen = ({ route, navigation }: any) => {
    const isEdit = route.params?.product !== undefined;
    const formatDateDisplay = (dateStr: string) => {
        if (!dateStr) return '';
        // If it comes with time, just take the date part
        const datePart = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr.substring(0, 10);
        const parts = datePart.split('-');
        if (parts.length !== 3) return datePart;
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
    };

    const parseDisplayDate = (displayDate: string) => {
        const parts = displayDate.split('/');
        if (parts.length !== 3) return displayDate;
        const [day, month, year] = parts;
        return `${year}-${month}-${day}`;
    };

    const getLocalDateObj = (displayDate: string) => {
        const parts = displayDate.split('/');
        if (parts.length !== 3) return new Date();
        const [day, month, year] = parts;
        return new Date(Number(year), Number(month) - 1, Number(day));
    };

    const formatLocalDateDisplay = (date: Date) => {
        if (isNaN(date.getTime())) return '';
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${d}/${m}/${y}`;
    };

    const initialProduct = route.params?.product ? {
        ...route.params.product,
        date_release: formatDateDisplay(route.params.product.date_release),
        date_revision: formatDateDisplay(route.params.product.date_revision)
    } : {
        id: '',
        name: '',
        description: '',
        logo: '',
        date_release: formatLocalDateDisplay(new Date()),
        date_revision: ''
    };

    // Calculate initial revision if new product or if missing
    if (initialProduct.date_release && !initialProduct.date_revision) {
        const date = getLocalDateObj(initialProduct.date_release);
        if (!isNaN(date.getTime())) {
            // Wait, calculate only if not edit, or date_revision is truly missing.
            date.setFullYear(date.getFullYear() + 1);
            initialProduct.date_revision = formatLocalDateDisplay(date);
        }
    }

    const [form, setForm] = useState(initialProduct);
    const [errors, setErrors] = useState<any>({});
    const [submitting, setSubmitting] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [tempDate, setTempDate] = useState<Date>(new Date());
    const [isScreenReady, setIsScreenReady] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const insets = useSafeAreaInsets();
    const { showToast } = useToast();

    useEffect(() => {
        // Simulate a brief transition delay for UX
        const timer = setTimeout(() => setIsScreenReady(true), 500);

        const showListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const hideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            clearTimeout(timer);
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    const updateRevisionDate = (releaseDate: string) => {
        if (releaseDate.length !== 10) return;
        try {
            const date = getLocalDateObj(releaseDate);
            if (!isNaN(date.getTime())) {
                date.setFullYear(date.getFullYear() + 1);
                setForm((prev: any) => ({ ...prev, date_revision: formatLocalDateDisplay(date) }));
            }
        } catch {
            // silent fail for invalid dates
        }
    };

    const handleDateChange = (text: string) => {
        let cleaned = text.replace(/[^0-9]/g, '');
        let formatted = cleaned;
        if (cleaned.length > 2) {
            formatted = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
        }
        if (cleaned.length > 4) {
            formatted = formatted.slice(0, 5) + '/' + formatted.slice(5, 9);
        }

        setForm((prev: any) => ({ ...prev, date_release: formatted }));
        if (formatted.length === 10) {
            updateRevisionDate(formatted);
            // Quick validation for past date check while typing
            const release = getLocalDateObj(formatted);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const isOriginalDate = isEdit && formatted === initialProduct.date_release;

            if (!isNaN(release.getTime()) && release < today && !isOriginalDate) {
                setErrors((prev: any) => ({ ...prev, date_release: 'No puede ser menor al día actual' }));
            } else {
                setErrors((prev: any) => {
                    const newErrors = { ...prev };
                    delete newErrors.date_release;
                    return newErrors;
                });
            }
        }
    };

    const validate = async () => {
        let newErrors: any = {};

        if (!form.id) {
            newErrors.id = 'Este campo es requerido!';
        } else if (form.id.length < 3) {
            newErrors.id = 'Mínimo 3 caracteres';
        } else if (form.id.length > 10) {
            newErrors.id = 'Máximo 10 caracteres';
        } else if (!isEdit) {
            const exists = await ProductService.verifyId(form.id);
            if (exists) newErrors.id = 'ID ya existe';
        }

        if (!form.name) {
            newErrors.name = 'Este campo es requerido!';
        } else if (form.name.length < 6) {
            newErrors.name = 'Mínimo 6 caracteres';
        }

        if (!form.description) {
            newErrors.description = 'Este campo es requerido!';
        } else if (form.description.length < 10) {
            newErrors.description = 'Mínimo 10 caracteres';
        }

        if (!form.logo) {
            newErrors.logo = 'Este campo es requerido!';
        }

        if (!form.date_release) {
            newErrors.date_release = 'Este campo es requerido!';
        } else if (form.date_release.length !== 10) {
            newErrors.date_release = 'Formato inválido (DD/MM/YYYY)';
        } else {
            const release = getLocalDateObj(form.date_release);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (isNaN(release.getTime())) {
                newErrors.date_release = 'Fecha inválida';
            } else if (release < today) {
                // Allow old dates if they haven't modified the original date during an edit
                const isOriginalDate = isEdit && form.date_release === initialProduct.date_release;
                if (!isOriginalDate) {
                    newErrors.date_release = 'No puede ser menor al día actual';
                }
            }
        }

        if (!form.date_revision) {
            newErrors.date_revision = 'Este campo es requerido!';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        const isValid = await validate();
        if (!isValid) return;

        setSubmitting(true);
        try {
            const submissionForm = {
                ...form,
                date_release: parseDisplayDate(form.date_release),
                date_revision: parseDisplayDate(form.date_revision)
            };
            if (isEdit) {
                await ProductService.updateProduct(submissionForm);
                showToast('¡Producto actualizado exitosamente!', 'success');
            } else {
                await ProductService.addProduct(submissionForm);
                showToast('¡Producto creado exitosamente!', 'success');
            }
            navigation.navigate('Home', { refresh: true });
        } catch (error) {
            console.error(error);
            showToast('Ocurrió un error al guardar el producto', 'error');
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setForm(initialProduct);
        setErrors({});
    };

    const isDirty = JSON.stringify(form) !== JSON.stringify(initialProduct);

    const handlePickImage = async () => {
        const options: any = {
            mediaType: 'photo',
            quality: 1,
        };

        try {
            const result = await launchImageLibrary(options);
            if (result.didCancel) return;
            if (result.errorCode) {
                Alert.alert('Error', result.errorMessage || 'No se pudo seleccionar la imagen');
                return;
            }
            const uri = result.assets?.[0]?.uri;
            if (uri) {
                setForm((prev: any) => ({ ...prev, logo: uri }));
            }
        } catch (error) {
            console.error('ImagePicker Error: ', error);
        }
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.keyboardAvoid}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                {!isScreenReady ? (
                    <ProductFormSkeleton />
                ) : (
                    <ScrollView
                        contentContainerStyle={[
                            styles.scrollContent,
                            { paddingTop: insets.top + 70 }
                        ]}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.formContainer}>
                            <View style={styles.logoSection}>
                                <TouchableOpacity
                                    style={[styles.logoCircle, errors.logo ? styles.logoError : null]}
                                    onPress={handlePickImage}
                                    activeOpacity={0.7}
                                >
                                    {form.logo ? (
                                        <Image source={{ uri: form.logo }} style={styles.logoImage} resizeMode="cover" />
                                    ) : (
                                        <Camera size={32} color={Colors.secondary} />
                                    )}
                                </TouchableOpacity>
                                <Text style={styles.logoLabel}>Logo <Text style={styles.required}>*</Text></Text>
                                {errors.logo && <Text style={styles.errorText}>{errors.logo}</Text>}
                            </View>

                            <CustomInput
                                label="ID"
                                value={form.id}
                                onChangeText={(text) => setForm((prev: any) => ({ ...prev, id: text }))}
                                error={errors.id}
                                editable={!isEdit}
                                required
                            />

                            <CustomInput
                                label="Nombre"
                                value={form.name}
                                onChangeText={(text) => setForm((prev: any) => ({ ...prev, name: text }))}
                                error={errors.name}
                                required
                            />

                            <CustomInput
                                label="Descripción"
                                value={form.description}
                                onChangeText={(text) => setForm((prev: any) => ({ ...prev, description: text }))}
                                multiline
                                numberOfLines={2}
                                error={errors.description}
                                maxLength={200}
                                showCounter
                                required
                            />

                            <CustomInput
                                label="Fecha Liberación"
                                value={form.date_release}
                                placeholder="DD/MM/YYYY"
                                onChangeText={handleDateChange}
                                error={errors.date_release}
                                keyboardType="numeric"
                                maxLength={10}
                                rightIcon={
                                    <TouchableOpacity onPress={() => {
                                        let d = new Date();
                                        if (form.date_release.length === 10) {
                                            const parsed = getLocalDateObj(form.date_release);
                                            if (!isNaN(parsed.getTime())) d = parsed;
                                        }
                                        setTempDate(d);
                                        setShowPicker(true);
                                    }}>
                                        <Calendar size={20} color={Colors.primary} />
                                    </TouchableOpacity>
                                }
                                required
                            />

                            {showPicker && Platform.OS === 'android' && (
                                <DateTimePicker
                                    value={tempDate}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShowPicker(false);
                                        if (event.type === 'set' && selectedDate) {
                                            const formatted = formatLocalDateDisplay(selectedDate);
                                            setForm((prev: any) => ({ ...prev, date_release: formatted }));
                                            updateRevisionDate(formatted);
                                            setErrors((prev: any) => {
                                                const newErrors = { ...prev };
                                                delete newErrors.date_release;
                                                return newErrors;
                                            });
                                        }
                                    }}
                                    minimumDate={new Date()}
                                />
                            )}

                            {showPicker && Platform.OS === 'ios' && (
                                <Modal
                                    visible={showPicker}
                                    transparent={true}
                                    animationType="slide"
                                    onRequestClose={() => setShowPicker(false)}
                                >
                                    <TouchableOpacity
                                        style={styles.modalOverlay}
                                        activeOpacity={1}
                                        onPress={() => setShowPicker(false)}
                                    >
                                        <TouchableOpacity
                                            activeOpacity={1}
                                            style={styles.modalContent}
                                        >
                                            <View style={styles.modalHeader}>
                                                <TouchableOpacity onPress={() => setShowPicker(false)}>
                                                    <Text style={styles.modalCancelBtn}>Cancelar</Text>
                                                </TouchableOpacity>
                                                <Text style={styles.modalTitle}>Fecha Liberación</Text>
                                                <TouchableOpacity onPress={() => {
                                                    const today = new Date();
                                                    today.setHours(0, 0, 0, 0);
                                                    const releaseDate = new Date(tempDate);
                                                    releaseDate.setHours(0, 0, 0, 0);

                                                    const formatted = formatLocalDateDisplay(tempDate);
                                                    const isOriginalDate = isEdit && formatted === initialProduct.date_release;

                                                    if (releaseDate < today && !isOriginalDate) {
                                                        Alert.alert('Fecha inválida', 'La fecha de liberación no puede ser menor al día actual.');
                                                        return;
                                                    }

                                                    setForm((prev: any) => ({ ...prev, date_release: formatted }));
                                                    updateRevisionDate(formatted);
                                                    setErrors((prev: any) => {
                                                        const newErrors = { ...prev };
                                                        delete newErrors.date_release;
                                                        return newErrors;
                                                    });
                                                    setShowPicker(false);
                                                }}>
                                                    <Text style={styles.modalAcceptBtn}>Aceptar</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.pickerContainer}>
                                                <DateTimePicker
                                                    value={tempDate}
                                                    mode="date"
                                                    display="spinner"
                                                    onChange={(_, selectedDate) => {
                                                        if (selectedDate) setTempDate(selectedDate);
                                                    }}
                                                    minimumDate={new Date()}
                                                    textColor={Colors.black}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    </TouchableOpacity>
                                </Modal>
                            )}

                            <CustomInput
                                label="Fecha Revisión"
                                value={form.date_revision}
                                editable={false}
                                error={errors.date_revision}
                                rightIcon={<Calendar size={20} color="#CCC" />}
                                required
                            />
                        </View>
                    </ScrollView>
                )}
            </KeyboardAvoidingView>

            {!isKeyboardVisible && (
                <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
                    <CustomButton
                        title="Reiniciar"
                        onPress={handleReset}
                        variant="secondary"
                        style={[styles.flexButton, isDirty ? styles.resetBtnActive : styles.resetBtn]}
                    />
                    <CustomButton
                        title={isEdit ? "Guardar" : "Enviar"}
                        onPress={handleSubmit}
                        loading={submitting}
                        style={styles.flexButton}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 100,
    },
    formContainer: {
        gap: 0,
    },
    logoSection: {
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 32,
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
        borderStyle: 'dashed',
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
    logoError: {
        borderColor: Colors.danger,
        borderStyle: 'solid',
    },
    required: {
        color: Colors.danger,
    },
    errorText: {
        color: Colors.danger,
        fontSize: 12,
        marginTop: 5,
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
    submitBtn: {
        backgroundColor: Colors.primary,
    },
    resetBtn: {
        backgroundColor: Colors.secondary,
        opacity: 0.6,
    },
    resetBtnActive: {
        backgroundColor: Colors.danger,
        opacity: 1,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    modalCancelBtn: {
        color: Colors.danger,
        fontSize: 16,
        fontWeight: '500',
    },
    modalAcceptBtn: {
        color: Colors.primary,
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
    },
    pickerContainer: {
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
