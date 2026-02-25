export interface Product {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: string; // ISO Date String
    date_revision: string; // ISO Date String
}

export interface ProductFormData extends Omit<Product, 'date_release' | 'date_revision'> {
    date_release: Date;
    date_revision: Date;
}
