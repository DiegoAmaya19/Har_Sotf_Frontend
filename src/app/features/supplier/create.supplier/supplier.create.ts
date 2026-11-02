import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Categoryproduct } from '../../../core/models/categoryProduct';
import { SupplierRequestDTO } from '../../../core/models/DTOs/Request/supplierRequest';
import { CategoryProductService } from '../../categoryProduct/category.product.service';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-create',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './supplier-create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierCreate {
  private readonly fb = inject(FormBuilder);
  protected readonly supplierService = inject(SupplierService);
  protected readonly categoryProductService = inject(CategoryProductService);
  protected readonly categories = signal<Categoryproduct[]>([]);
  protected readonly isSubmitting = signal(false);
  protected readonly loadError = signal<string | null>(null);
  protected readonly notification = signal<{
    kind: 'success' | 'error';
    message: string;
  } | null>(null);

  protected readonly form = this.fb.group({
    nit: ['', Validators.required],
    company: ['', Validators.required],
    contact: ['', Validators.required],
    phoneContact: ['', Validators.required],
    idCategoryProduct: this.fb.control<number[]>([], Validators.required),
  });

  constructor() {
    this.categoryProductService.readAllCategoryProducts().subscribe({
      next: (categories) => this.categories.set(categories),
      error: (error) => {
        console.error('Error al cargar las categorías de productos', error);
        this.loadError.set('No se pudieron cargar las categorías de productos.');
      },
    });
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const dto: SupplierRequestDTO = {
      nit: raw.nit ?? '',
      company: raw.company ?? '',
      contact: raw.contact ?? '',
      phoneContact: raw.phoneContact ?? '',
      idCategoryProduct: raw.idCategoryProduct ?? [],
    };

    this.isSubmitting.set(true);
    this.notification.set(null);

    this.supplierService
      .createSupplier(dto)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.form.reset({
            nit: '',
            company: '',
            contact: '',
            phoneContact: '',
            idCategoryProduct: [],
          });
          this.notification.set({
            kind: 'success',
            message: 'El proveedor se creó correctamente.',
          });
        },
        error: (error) => {
          console.error('Error al crear el proveedor', error);
          this.notification.set({
            kind: 'error',
            message: 'No se pudo crear el proveedor. Inténtalo de nuevo.',
          });
        },
      });
  }

  protected dismissNotification(): void {
    this.notification.set(null);
  }
}
