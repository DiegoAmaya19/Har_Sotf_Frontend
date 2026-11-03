import {
    ChangeDetectionStrategy,
    Component,
    DestroyRef,
    OnInit,
    computed,
    inject,
    signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
export class SupplierCreate implements OnInit {
    private readonly fb = inject(FormBuilder);
    private readonly destroyRef = inject(DestroyRef);
    protected readonly supplierService = inject(SupplierService);
    protected readonly categoryProductService = inject(CategoryProductService);
    protected readonly categories = signal<Categoryproduct[]>([]);
    protected readonly categoriesLoading = signal(true);
    protected readonly categoryDropdownOpen = signal(false);
    protected readonly isSubmitting = signal(false);
    protected readonly loadError = signal<string | null>(null);
    protected readonly notification = signal<{
        kind: 'success' | 'error';
        message: string;
    } | null>(null);
    protected readonly selectedCategories = computed(() => {
        const selectedIds = this.form.controls.idCategoryProduct.value;
        return this.categories().filter((category) => selectedIds.includes(category.idCategoryProduct));
    });

    protected readonly form = this.fb.nonNullable.group({
        nit: ['', [Validators.required, Validators.pattern(/\S/)]],
        company: ['', [Validators.required, Validators.pattern(/\S/)]],
        contact: ['', [Validators.required, Validators.pattern(/\S/)]],
        phoneContact: ['', [Validators.required, Validators.pattern(/\S/)]],
        idCategoryProduct: this.fb.nonNullable.control<number[]>([], Validators.required),
    });

    /** Carga las categorías disponibles para asociarlas al nuevo proveedor. */
    ngOnInit(): void {
        this.categoryProductService
            .readAllCategoryProducts()
            .pipe(
                finalize(() => this.categoriesLoading.set(false)),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe({
                next: (categories) => {
                    this.categories.set(categories);
                    this.loadError.set(null);
                },
                error: (error) => {
                    console.error('Error al cargar las categorías de productos', error);
                    this.loadError.set('No se pudieron cargar las categorías de productos.');
                },
            });
    }

    /** Abre o cierra el selector cuando ya hay categorías disponibles. */
    protected toggleCategoryDropdown(): void {
        if (!this.categoriesLoading() && this.categories().length > 0) {
            this.categoryDropdownOpen.update((open) => !open);
        }
    }

    /** Actualiza el formulario al marcar o desmarcar una categoría. */
    protected onCategoryChange(event: Event, categoryId: number): void {
        const target = event.target;
        if (!(target instanceof HTMLInputElement)) {
            return;
        }

        const selectedIds = this.form.controls.idCategoryProduct.value;
        const updatedIds = target.checked
            ? [...selectedIds, categoryId]
            : selectedIds.filter((id) => id !== categoryId);
        this.form.controls.idCategoryProduct.setValue(updatedIds);
        this.form.controls.idCategoryProduct.markAsTouched();
    }

    /** Valida y envía los datos del proveedor; informa el resultado al usuario. */
    protected onSubmit(): void {

        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const raw = this.form.getRawValue();

        const categorysIds: Array<number> = [];

        raw.idCategoryProduct.forEach(element => {
            console.info(element.valueOf)
            // this.categoryProductService.readNameCategory(element)
        });

        


        categorysIds.push();

        const dto: SupplierRequestDTO = {
            nit: raw.nit.trim(),
            company: raw.company.trim(),
            contact: raw.contact.trim(),
            phoneContact: raw.phoneContact.trim(),
            idCategoryProduct: raw.idCategoryProduct,
        };

        this.isSubmitting.set(true);
        this.loadError.set(null);
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
                    this.categoryDropdownOpen.set(false);
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

    /** Cierra la notificación visible. */
    protected dismissNotification(): void {
        this.notification.set(null);
    }
}
