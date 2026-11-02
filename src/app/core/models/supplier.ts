import { Categoryproduct } from "./categoryProduct";

export interface Supplier {
    idSupplier: number;
    nit: string;
    company: string;
    contact: string;
    phoneContact: string
    idCategoryProduct: Array<Categoryproduct>;
}