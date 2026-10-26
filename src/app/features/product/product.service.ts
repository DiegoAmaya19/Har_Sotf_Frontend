import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Product } from "../../core/models/product";
import { ProductRequestDTO } from "../../core/models/DTOs/Request/productRequest";

@Injectable({ providedIn: "root" })
export class ProductService {

    private readonly baseUrlCreate = `http://localhost:8080/api/products/register`; // Pendiente para el environment variable
    private readonly baseUrlGetAll = `http://localhost:8080/api/products/all?`; // Pendiente para el environment variable
    private readonly baseUrlGetUuid = `http://localhost:8080/api/products/uuid/`; // Pendiente para el environment variable
    private readonly baseUrlSearch = `http://localhost:8080/api/products/name?name=`; // Pendiente para el environment variable
    private readonly baseUrlAcount = `http://localhost:8080/api/products/count`;
    private readonly baseUrlGetForCategory = `http://localhost:8080/api/products/categoryproduct/`;

    constructor(
        private readonly http: HttpClient
    ) { }

    // Metodo para crear un nuevo producto
    createProduct(dto: ProductRequestDTO): Observable<Product> {
        return this.http.post<Product>(this.baseUrlCreate, dto);
    }

    // Metodo para obtener todos los productos
    readAllProducts(page: number, size: number): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrlGetAll + `page=` + page + `&size=` + size);
    }

    // Matodo para obtener por uuid
    readProductUuid(uuid: string | null): Observable<Product> {
        return this.http.get<Product>(this.baseUrlGetUuid + uuid);
    }

    // Metodo para obtener productos por nombre
    searchProduct(name: string = ``): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrlSearch + name + `&page=0&size=3`);
    }

    getProductForCategory(category: string = ``): Observable<Product[]> {
        return this.http.get<Product[]>(this.baseUrlGetForCategory + category);
    }

    acountProduct(): Observable<number> {
        return this.http.get<number>(this.baseUrlAcount);
    }

}
