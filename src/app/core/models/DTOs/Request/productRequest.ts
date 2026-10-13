import { ProductDetailsDTORequest } from "./productDetailsRequestDTO";

export interface ProductRequestDTO {

    nameProduct: string; // Nombre del producto
    idCategoryProduct: number; // Identificador de la categoria del producto
    stock: number; // Cantidad de productos disponibles
    productDetailsRequestDTO: ProductDetailsDTORequest; // Detalles del producto
}