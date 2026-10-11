import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductRequestDTO, ProductService } from '../../../core/services/product.service';
import {
    FormBuilder,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';
import { finalize } from 'rxjs';

@Component({
    selector: 'app-product-create',
    imports: [ReactiveFormsModule],
    templateUrl: './product-create.html',
})
export class ProductCreateComponent {

    private readonly fb = inject(FormBuilder);
    protected readonly apiProduct = inject(ProductService);
    protected readonly isSubmitting = signal(false);

    protected readonly form = this.fb.group({
        uuid: ['', Validators.required],
        nameProduct: ['', Validators.required],
        categoryProduct: ['', Validators.required],
        description: ['', Validators.required],
        price: [null as number | null, [Validators.required, Validators.min(0)]],
        stock: [null as number | null, [Validators.required, Validators.min(0)]],
        reference: ['', Validators.required],
    });


    protected async onSubmit() {

        const raw = this.form.value;

        const dto: ProductRequestDTO = {
            nameProduct: raw.nameProduct ?? '',
            categoryProduct: raw.categoryProduct ?? '',
            description: raw.description ?? '',
            price: raw.price ?? 0,
            stock: raw.stock ?? 0,
            reference: raw.reference ?? '',
        } as ProductRequestDTO;

        this.isSubmitting.set(true);

        this.apiProduct
          .createProduct(dto)
          .pipe(
            finalize(() => this.isSubmitting.set(false))
          )
          .subscribe({
            next: () => {
                console.log('Producto creado exitosamente');
            },
            error: (error) => {
              console.error('Error al crear el libro', error);
            }
          });

    }

}