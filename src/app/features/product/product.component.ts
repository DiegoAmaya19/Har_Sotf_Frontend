import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../../core/services/product.service'

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {

    protected readonly apiProduct = inject(ProductService);
    protected products = signal<any[]>([]);
    protected findProduct = signal<any | null>(null);

    ngOnInit(): void {

        this.apiProduct.readAllProducts().subscribe({
            next: (p) => {
                this.products.set(p);
                console.log('Products fetched successfully:', p)
            },
            error: (err) => {
                console.log(err);
            }
        });

    }

}
