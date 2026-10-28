import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product.service';
import { ProductRequestDTO } from '../../../core/models/DTOs/Request/productRequest';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { Product } from '../../../core/models/product';
import { ActivatedRoute } from '@angular/router';
import { Categoryproduct } from '../../../core/models/categoryProduct';
import { FormsModule } from '@angular/forms';
import { CategoryProductService } from '../../categoryProduct/category.product.service';

@Component({
    selector: 'app-product-update',
    imports: [ReactiveFormsModule, FormsModule],
    templateUrl: './product-update.html',
})
export class ProductUpdate implements OnInit {
    protected readonly product = signal<Product | null>(null);
    protected categoryProducts = signal<Categoryproduct[]>([]);
    protected readonly loadError = signal<string | null>(null);
    private readonly fb = inject(FormBuilder);
    protected readonly productService = inject(ProductService);
    protected readonly categoryProductService = inject(CategoryProductService);
    protected readonly isSubmitting = signal(false);
    private readonly route = inject(ActivatedRoute);
    protected uuid: string | null = null;

    protected readonly form = this.fb.group({
        nameProduct: ['', Validators.required],
        categoryProduct: [null as string | null, Validators.required],
        description: ['', Validators.required],
        price: [null as number | null, [Validators.required, Validators.min(0)]],
        stock: [null as number | null, [Validators.required, Validators.min(0)]],
        reference: ['', Validators.required],
    });

    ngOnInit(): void {
        this.uuid = this.route.snapshot.paramMap.get('uuid');
        if (!this.uuid) {
            this.loadError.set('No se recibió el identificador del producto.');
            return;
        }

        this.productService.readProductUuid(this.uuid).subscribe({
            next: (product) => {
                this.product.set(product);
                this.form.patchValue({
                    nameProduct: product.nameProduct,
                    description: product.description,
                    price: product.price,
                    stock: product.stock,
                    reference: product.reference,
                });
                this.selectProductCategory();
            },
            error: (err) => {
                console.error('Error al cargar el producto', err);
                this.loadError.set('No se pudo cargar el producto.');
            },
        });

        this.categoryProductService.readAllCategoryProducts().subscribe({
            next: (categories) => {
                this.categoryProducts.set(categories);
                this.selectProductCategory();
            },
            error: (err) => {
                console.error('Error al cargar las categorías', err);
                this.loadError.set('No se pudieron cargar las categorías.');
            },
        });
    }

    private selectProductCategory(): void {
        const product = this.product();
        if (!product || this.categoryProducts().length === 0) {
            return;
        }

        const selectedCategory = this.categoryProducts().find(
            (category) =>
                category.nameCategoryProduct === product.categoryProduct ||
                String(category.idCategoryProduct) === product.categoryProduct,
        );

        this.form.patchValue({
            categoryProduct: selectedCategory?.nameCategoryProduct ?? null,
        });
    }

    protected async onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const raw = this.form.getRawValue();
        const selectedCategory = this.categoryProducts().find(
            (category) => category.nameCategoryProduct === raw.categoryProduct,
        );

        if (!selectedCategory) {
            this.loadError.set('Selecciona una categoría válida.');
            return;
        }

        const dto: ProductRequestDTO = {
            nameProduct: raw.nameProduct ?? '',
            idCategoryProduct: selectedCategory.idCategoryProduct,
            stock: raw.stock ?? 0,
            productDetailsRequestDTO: {
                description: raw.description ?? '',
                price: raw.price ?? 0,
                reference: raw.reference ?? '',
            },
        };

        this.isSubmitting.set(true);

        this.productService
            .update(this.uuid, dto)
            .pipe(finalize(() => this.isSubmitting.set(false)))
            .subscribe({
                next: () => {
                    console.log('Producto actualizado exitosamente');
                },
                error: (error) => {
                    console.error('Error al crear el producto', error);
                },
            });
    }
}
