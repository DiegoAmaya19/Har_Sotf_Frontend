import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductComponent } from './features/product/product.component';
import { ProductCreateComponent } from './features/product/create.product/product.create';

@Component({
  selector: 'app-root',
  imports: [ProductComponent, ProductCreateComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
