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

    ngOnInit(): void {

        this.apiProduct.readAllProducts().subscribe({
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

}
