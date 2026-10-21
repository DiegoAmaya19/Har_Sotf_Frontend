import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product.service'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/product';

@Component({
    selector: 'app-product-read',
    templateUrl: './product.read.html',
    imports: [RouterModule, FormsModule],
    styleUrl: './product.read.css',
})
export class ProductRead implements OnInit {

    protected readonly apiProduct = inject(ProductService);
    protected products = signal<Product[]>([]);
    protected findProduct = signal<any | null>(null);
    protected searched = signal<string>('');
    protected pageIndex = signal<number>(0);
    protected pageSize = signal<number>(9);
    protected acountProduct = signal<number>(0);

    ngOnInit(): void {
        this.getAll();
        this.onCountProduct();
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
        if (!Number.isInteger(pageSize) || pageSize <= 0) {
            return;
        }

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

}
