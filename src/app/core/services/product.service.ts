import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from "../models/product";
import { ProductRequestDTO } from "../models/DTOs/Request/productRequest";
// import { environment } from "../../../environments/environment"; // pendiente para el environment variable



@Injectable({ providedIn: "root" })
export class ProductService {

    private readonly baseUrlGet = `http://localhost:8080/api/products/all`; // Pendiente para el environment variable
    private readonly baseUrlCreate = `http://localhost:8080/api/products/register`; // Pendiente para el environment variable

    constructor(
        private readonly http: HttpClient
    ) { }

    // Metodo para crear un nuevo producto
    createProduct(dto: ProductRequestDTO): Observable<Product> {
        return this.http.post<Product>(this.baseUrlCreate, dto);
    }

    // Metodo para obtener todos los productos
    readAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrlGet);
    }

}
