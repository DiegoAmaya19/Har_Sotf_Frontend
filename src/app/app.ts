import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductRead } from './features/product/read.product/product.read';
import { ProductCreateComponent } from './features/product/create.product/product.create';

@Component({
  selector: 'app-root',
  imports: [ProductRead, ProductCreateComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
