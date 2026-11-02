import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-supplier-main',
  imports: [RouterModule],
  templateUrl: './supplier.main.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierMain {}
