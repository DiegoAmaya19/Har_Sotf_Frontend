import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from "../models/product";
// import { environment } from "../../../environments/environment"; // pendiente para el environment variable

export type ProductRequestDTO = Omit<Product, 'uuid'>;

@Injectable({ providedIn: "root" })
export class ProductService {

    private readonly baseUrl = `http://localhost:8080/api/products/all`; // Pendiente para el environment variable
    

    constructor(
        private readonly http: HttpClient
    ) { }

    // Metodo para crear un nuevo producto
    createProduct(product: ProductRequestDTO): Observable<Product> {
        return this.http.post<Product>(this.baseUrl, product);
    }

    // Metodo para obtener todos los productos
    readAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrl);
    }

}