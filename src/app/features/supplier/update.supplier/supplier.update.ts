import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { Categoryproduct } from '../../../core/models/categoryProduct';
import { SupplierRequestDTO } from '../../../core/models/DTOs/Request/supplierRequest';
import { CategoryProductService } from '../../categoryProduct/category.product.service';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplier-update',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './supplier-update.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierUpdate implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  protected readonly supplierService = inject(SupplierService);
  protected readonly categoryProductService = inject(CategoryProductService);
  protected readonly categories = signal<Categoryproduct[]>([]);
  protected readonly loadError = signal<string | null>(null);
  protected readonly notification = signal<{
    kind: 'success' | 'error';
    message: string;
  } | null>(null);
  protected readonly isSubmitting = signal(false);
  protected readonly id = signal<number | null>(null);

  protected readonly form = this.fb.group({
    nit: ['', Validators.required],
    company: ['', Validators.required],
    contact: ['', Validators.required],
    phoneContact: ['', Validators.required],
    idCategoryProduct: this.fb.control<number[]>([], Validators.required),
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (!idParam || !Number.isInteger(id) || id < 1) {
      this.loadError.set('No se recibió un identificador válido del proveedor.');
      return;
    }
    this.id.set(id);

    this.supplierService.readSupplierById(id).subscribe({
      next: (supplier) => {
        this.form.patchValue({
          nit: supplier.nit,
          company: supplier.company,
          contact: supplier.contact,
          phoneContact: supplier.phoneContact,
          idCategoryProduct: supplier.idCategoryProduct.map(
            (category) => category.idCategoryProduct,
          ),
        });
      },
      error: (error) => {
        console.error('Error al cargar el proveedor', error);
        this.loadError.set('No se pudo cargar el proveedor.');
      },
    });

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

    const id = this.id();
    if (id === null) {
      this.loadError.set('No se recibió un identificador válido del proveedor.');
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
    this.loadError.set(null);
    this.notification.set(null);
    this.isSubmitting.set(true);

    this.supplierService
      .updateSupplier(id, dto)
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: () => {
          this.notification.set({
            kind: 'success',
            message: 'El proveedor se actualizó correctamente.',
          });
        },
        error: (error) => {
          console.error('Error al actualizar el proveedor', error);
          this.notification.set({
            kind: 'error',
            message: 'No se pudo actualizar el proveedor.',
          });
        },
      });
  }
}
