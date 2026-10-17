import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService } from '../product.service'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-product-read',
    templateUrl: './product.read.html',
    imports: [RouterModule, FormsModule],
    styleUrl: './product.read.css',
})
export class ProductRead implements OnInit {

    protected readonly apiProduct = inject(ProductService);
    protected products = signal<any[]>([]);
    protected findProduct = signal<any | null>(null);
    protected search = signal<string>('');

    ngOnInit(): void {

        if (this.search().trim().length > 0) {
            this.search().concat('dsd');
        } else {
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

}
