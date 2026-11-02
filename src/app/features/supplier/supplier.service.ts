import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { SupplierRequestDTO } from '../../core/models/DTOs/Request/supplierRequest';
import { Supplier } from '../../core/models/supplier';

@Injectable({ providedIn: 'root' })
export class SupplierService {
  private readonly http = inject(HttpClient);

  // Completa estas URL con las rutas correspondientes del backend.
  private readonly baseUrlCreate = 'http://localhost:8080/api/supplier/create/';
  private readonly baseUrlGetAll = 'http://localhost:8080/api/supplier/all';
  private readonly baseUrlGetById = '';
  private readonly baseUrlUpdate = '';
  private readonly baseUrlDelete = '';

  createSupplier(dto: SupplierRequestDTO): Observable<Supplier> {
    return this.requestAt(this.baseUrlCreate, (url) => this.http.post<Supplier>(url, dto));
  }

  readAllSuppliers(): Observable<Supplier[]> {
    return this.requestAt(this.baseUrlGetAll, (url) => this.http.get<Supplier[]>(url));
  }

  readSupplierById(id: number): Observable<Supplier> {
    return this.requestAt(this.baseUrlGetById, (url) => this.http.get<Supplier>(url + id));
  }

  updateSupplier(id: number, dto: SupplierRequestDTO): Observable<Supplier> {
    return this.requestAt(this.baseUrlUpdate, (url) => this.http.put<Supplier>(url + id, dto));
  }

  deleteSupplier(id: number): Observable<void> {
    return this.requestAt(this.baseUrlDelete, (url) => this.http.delete<void>(url + id));
  }

  private requestAt<T>(
    url: string,
    request: (configuredUrl: string) => Observable<T>,
  ): Observable<T> {
    return defer(() => {
      if (!url.trim()) {
        throw new Error('Configura la URL del endpoint de proveedores antes de usar el CRUD.');
      }

      return request(url);
    });
  }
}
