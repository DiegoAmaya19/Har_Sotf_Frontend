import { Component, computed, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { ProductService } from '../product.service'
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/product';
import { CategoryProductService } from '../../categoryProduct/category.product.service';
import { Categoryproduct } from '../../../core/models/categoryProduct';

@Component({
    selector: 'app-product-read',
    templateUrl: './product.read.html',
    imports: [FormsModule],
    styleUrl: './product.read.css',
})
export class ProductRead implements OnInit {

    protected readonly apiProduct = inject(ProductService);
    protected readonly apiCategoryProduct = inject(CategoryProductService);
    protected products = signal<Product[]>([]);
    protected findProduct = signal<any | null>(null);
    protected searched = signal<string>('');
    protected pageIndex = signal<number>(0);
    protected pageSize = signal<number>(3);
    protected acountProduct = signal<number>(0);
    protected categoryProducts = signal<Categoryproduct[]>([]);
    // protected optionSelected = signal<string | undefined>('');
    protected limPageIndex = computed(() =>
        Math.floor(this.acountProduct() / this.pageSize())
    );
    protected optionSelected = linkedSignal(
        () => this.categoryProducts().at(0)?.nameCategoryProduct ?? ''
    );

    ngOnInit(): void {
        this.onCountProduct();
        this.updatePageSize(this.pageSize());
        this.getAll();
        this.getAllCategoryProducts();
    }

    getAll(): void {
        this.apiProduct.readAllProducts(this.pageIndex(), this.pageSize()).subscribe({
            next: (p) => {
                this.products.set(p);
                console.log('Products fetched successfully:', p)
            },
            error: (err) => console.log(err)
        });
    }

    onSearch(): void {
        this.apiProduct.searchProduct(this.searched()).subscribe({
            next: (p) => this.products.set(p ?? []),
            error: err => console.error(err)
        });
    }

    goToNextPage(): void {
        this.pageIndex.update(index => index + 1);
        this.getAll();
    }

    goToPreviousPage(): void {
        if (this.pageIndex() > 0) {
            this.pageIndex.update(index => index - 1);
            this.getAll();
        }
    }

    updatePageSize(pageSize: number): void {
        this.pageSize.set(pageSize);
        this.pageIndex.set(0);
        this.getAll();
    }

    onCountProduct(): void {
        this.apiProduct.acountProduct().subscribe({
            next: acount => this.acountProduct.set(acount),
            error: err => console.error(err)
        })
    }

    getAllCategoryProducts(): void {
        this.apiCategoryProduct.readAllCategoryProducts().subscribe({
            next: category => this.categoryProducts.set(category),
            error: err => console.error(err)
        });
    }

    onCategoryProduct(optSelected: string): void {
        this.optionSelected.set(optSelected);
    }

}
