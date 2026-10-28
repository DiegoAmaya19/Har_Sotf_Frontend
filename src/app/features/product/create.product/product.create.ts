import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../product/product.service';
import { ProductRequestDTO } from '../../../core/models/DTOs/Request/productRequest';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-product-create',
    imports: [ReactiveFormsModule],
    templateUrl: './product-create.html',
})
export class ProductCreate {
    private readonly fb = inject(FormBuilder);
    protected readonly productService = inject(ProductService);
    protected readonly isSubmitting = signal(false);
    protected readonly notification = signal<{
        kind: 'success' | 'error';
        message: string;
    } | null>(null);

    protected readonly form = this.fb.group({
        nameProduct: ['', Validators.required],
        categoryProduct: [null as number | null, [Validators.required, Validators.min(1)]],
        description: ['', Validators.required],
        price: [null as number | null, [Validators.required, Validators.min(0)]],
        stock: [null as number | null, [Validators.required, Validators.min(0)]],
        reference: ['', Validators.required],
    });

    protected onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const raw = this.form.getRawValue();

        const dto: ProductRequestDTO = {
            nameProduct: raw.nameProduct ?? '',
            idCategoryProduct: raw.categoryProduct ?? 0,
            stock: raw.stock ?? 0,
            productDetailsRequestDTO: {
                description: raw.description ?? '',
                price: raw.price ?? 0,
                reference: raw.reference ?? '',
            },
        };

        this.isSubmitting.set(true);
        this.notification.set(null);

        this.productService
            .createProduct(dto)
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
                next: () => {
                    this.form.reset();
                    this.notification.set({
                        kind: 'success',
                        message: 'El producto se creó correctamente.',
                    });
                },
                error: (error) => {
                    console.error('Error al crear el producto', error);
                    this.notification.set({
                        kind: 'error',
                        message: 'No se pudo crear el producto. Inténtalo de nuevo.',
                    });
                },
            });
    }

    protected dismissNotification(): void {
        this.notification.set(null);
    }
}
