import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Categoryproduct } from "../../core/models/categoryProduct";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class CategoryProductService {

    private readonly baseUrlCategoryProduct = "http://localhost:8080/api/categoryproduct/all";
    private readonly baseUrlGetNameCategory = "http://localhost:8080/api/categoryproduct/namecategory/";

    constructor(private readonly http: HttpClient) { }

    // Metodo para obtener las categorias de los productos
    readAllCategoryProducts(): Observable<Categoryproduct[]> {
        return this.http.get<Categoryproduct[]>(this.baseUrlCategoryProduct);
    }

    readNameCategory(nameCategory: string): Observable<Categoryproduct[]> {
        return this.http.get<Categoryproduct[]>(this.baseUrlGetNameCategory + nameCategory);
    }
}