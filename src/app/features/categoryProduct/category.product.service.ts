import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Categoryproduct } from "../../core/models/categoryProduct";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CategoryProductService {
    private readonly baseUrlCategoriProduct = "http://localhost:8080/api/categoryproduct/all";

    constructor(private readonly http: HttpClient) { }

    // Metodo para obtener las categorias de los productos
    readAllCategoryProducts(): Observable<Categoryproduct[]> {
        return this.http.get<Categoryproduct[]>(this.baseUrlCategoriProduct);
    }
}