import { ArrowDownAZ, ArrowDownUp, ArrowUpAZ, CalendarArrowDown, CalendarArrowUp, Filter, Search, X } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Modal, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProductCard } from '../../../components/ProductCard';
import { CustomButton } from '../../../components/Shared/Button/CustomButton';
import { SearchInput } from '../../../components/Shared/Forms/SearchInput';
import { ProductListSkeleton } from '../../../components/Shared/Skeletons/ProductListSkeleton';
import { Colors } from '../../../constants/Colors';
import { Product } from '../../../services/Product';
import { ProductService } from '../../../services/ProductService';

export const HomeScreen = ({ navigation }: any) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [displayCount, setDisplayCount] = useState(8);
    const [showSortModal, setShowSortModal] = useState(false);
    const [sortOrder, setSortOrder] = useState<'name_asc' | 'name_desc' | 'date_asc' | 'date_desc' | null>(null);
    const insets = useSafeAreaInsets();

    const fetchProducts = useCallback(async () => {
        try {
            const data = await ProductService.getProducts();
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        let result = products.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.id.toLowerCase().includes(search.toLowerCase())
        );

        if (sortOrder === 'name_asc') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOrder === 'name_desc') {
            result.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortOrder === 'date_asc' || sortOrder === 'date_desc') {
            result.sort((a, b) => {
                const parseDate = (dateStr: string) => {
                    if (!dateStr) return 0;
                    const datePart = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr.substring(0, 10);
                    const parts = datePart.split('-');
                    if (parts.length === 3) return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])).getTime();
                    return 0;
                };
                return sortOrder === 'date_desc'
                    ? parseDate(b.date_release) - parseDate(a.date_release)
                    : parseDate(a.date_release) - parseDate(b.date_release);
            });
        }

        setFilteredProducts(result);
        setDisplayCount(8); // Reset pagination on search or sort
    }, [search, products, sortOrder]);

    const handleLoadMore = () => {
        if (displayCount < filteredProducts.length) {
            setDisplayCount(prev => prev + 8);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const handleProductPress = (product: Product) => {
        navigation.navigate('ProductDetail', { product });
    };

    return (
        <View style={styles.container}>
            <View style={[styles.content, { paddingTop: insets.top + 80 }]}>
                <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <SearchInput
                            value={search}
                            onChangeText={setSearch}
                            containerStyle={styles.searchInputCustom}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterButton} onPress={() => setShowSortModal(true)} activeOpacity={0.7}>
                        <Filter size={20} color={sortOrder ? Colors.primary : Colors.black} />
                    </TouchableOpacity>
                </View>

                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsCount}>
                        {filteredProducts.length} Registros
                    </Text>
                </View>

                {loading ? (
                    <ProductListSkeleton />
                ) : (
                    <View style={styles.listContainer}>
                        <FlatList
                            data={filteredProducts.slice(0, displayCount)}
                            keyExtractor={(item) => item.id}
                            showsVerticalScrollIndicator={false}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item, index }) => (
                                <View style={[
                                    styles.cardWrapper,
                                    index === 0 && styles.firstCard,
                                    index === filteredProducts.length - 1 && styles.lastCard
                                ]}>
                                    <ProductCard
                                        product={item}
                                        onPress={() => handleProductPress(item)}
                                    />
                                </View>
                            )}
                            refreshControl={
                                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
                            }
                            ListEmptyComponent={
                                <View style={styles.emptyContainer}>
                                    <View style={styles.emptyIconContainer}>
                                        <Search size={40} color="#BDC3C7" />
                                    </View>
                                    <Text style={styles.emptyText}>No se encontraron productos</Text>
                                    <Text style={styles.emptySubtext}>Intenta con otros términos de búsqueda o recarga para nuevos datos</Text>
                                </View>
                            }
                            contentContainerStyle={styles.listContent}
                        />
                    </View>
                )}
            </View>
            <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
                <CustomButton
                    title="Agregar"
                    onPress={() => navigation.navigate('ProductForm')}
                />
            </View>

            {/* Sort Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showSortModal}
                onRequestClose={() => setShowSortModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Ordenar por</Text>
                            <TouchableOpacity onPress={() => setShowSortModal(false)} style={styles.closeIcon}>
                                <X size={24} color={Colors.black} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[styles.sortOption, sortOrder?.startsWith('name') && styles.sortOptionSelected]}
                            onPress={() => {
                                setSortOrder(prev => prev === 'name_asc' ? 'name_desc' : 'name_asc');
                                setShowSortModal(false);
                            }}
                        >
                            <Text style={[styles.sortText, sortOrder?.startsWith('name') && styles.sortTextSelected]}>Nombre</Text>
                            {sortOrder === 'name_asc' ? <ArrowDownAZ size={20} color={Colors.primary} /> :
                                sortOrder === 'name_desc' ? <ArrowUpAZ size={20} color={Colors.primary} /> :
                                    <ArrowDownUp size={20} color="#BDC3C7" />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.sortOption, sortOrder?.startsWith('date') && styles.sortOptionSelected]}
                            onPress={() => {
                                setSortOrder(prev => prev === 'date_desc' ? 'date_asc' : 'date_desc');
                                setShowSortModal(false);
                            }}
                        >
                            <Text style={[styles.sortText, sortOrder?.startsWith('date') && styles.sortTextSelected]}>Fecha de Liberación</Text>
                            {sortOrder === 'date_desc' ? <CalendarArrowDown size={20} color={Colors.primary} /> :
                                sortOrder === 'date_asc' ? <CalendarArrowUp size={20} color={Colors.primary} /> :
                                    <ArrowDownUp size={20} color="#BDC3C7" />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.sortOption}
                            onPress={() => {
                                setSortOrder(null);
                                setShowSortModal(false);
                            }}
                        >
                            <Text style={styles.sortText}>Quitar Filtros</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 10,
    },
    searchContainer: {
        flex: 1,
    },
    searchInputCustom: {
        marginBottom: 0,
        width: '100%',
    },
    resultsContainer: {
        marginBottom: 20,
        paddingHorizontal: 0,
    },
    resultsCount: {
        fontSize: 14,
        color: Colors.black,
        fontWeight: '500',
    },
    filterButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        flex: 1,
    },
    listContent: {
        paddingBottom: 20,
    },
    cardWrapper: {
        borderWidth: 1,
        borderColor: Colors.secondary,
        borderTopWidth: 0,
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 80,
    },
    emptyIconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F0F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyIcon: {
        fontSize: 40,
    },
    emptyText: {
        color: Colors.black,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    emptySubtext: {
        color: '#7F8C8D',
        fontSize: 14,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    footer: {
        paddingHorizontal: 25,
        paddingTop: 8,
        backgroundColor: Colors.background,
        borderTopWidth: 1,
        borderTopColor: Colors.secondary,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.black,
    },
    closeIcon: {
        padding: 4,
    },
    sortOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sortOptionSelected: {
        backgroundColor: '#F8F9FA',
        borderRadius: 8,
        borderBottomWidth: 0,
    },
    sortText: {
        fontSize: 16,
        color: Colors.black,
    },
    sortTextSelected: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
