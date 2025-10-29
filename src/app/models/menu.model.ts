// Create the object to type the data
export interface Product {
    name: string,
    unitPrice: number
}

export interface Category {
    id: number,
    name: string,
    products: Product[]
}

export interface MenuData {
    categories: Category[];
}