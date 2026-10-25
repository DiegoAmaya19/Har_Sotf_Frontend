import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductRequestDTO } from '../../../core/models/DTOs/Request/productRequest';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Product } from '../../../core/models/product';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-update',
    imports: [ReactiveFormsModule],
    templateUrl: './product-update.html',
})
export class ProductUpdate implements OnInit{

    @Input() product?: Product = undefined;

    private readonly fb = inject(FormBuilder);
    protected readonly productService = inject(ProductService);
    protected readonly isSubmitting = signal(false);
    private readonly route = inject(ActivatedRoute);
    protected uuid: string | null = null;

    protected readonly form = this.fb.group({
        nameProduct: ['', Validators.required],
        categoryProduct: [null as number | null, [Validators.required, Validators.min(1)]],
        description: ['', Validators.required],
        price: [null as number | null, [Validators.required, Validators.min(0)]],
        stock: [null as number | null, [Validators.required, Validators.min(0)]],
        reference: ['', Validators.required],
    });

    ngOnInit(): void {
        this.uuid = this.route.snapshot.paramMap.get('uuid');
    }

    protected async onSubmit() {
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

        this.productService
            .createProduct(dto)
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
                next: () => {
                    console.log('Producto creado exitosamente');
                },
                error: (error) => {
                    console.error('Error al crear el libro', error);
                },
            });
    }
}
