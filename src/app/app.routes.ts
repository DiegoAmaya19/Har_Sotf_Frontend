import { Routes } from '@angular/router';
import { ProductMain } from './features/product/product.main';
import { ProductCreate } from './features/product/create.product/product.create';
import { ProductRead } from './features/product/read.product/product.read';
import { ProductUpdate } from './features/product/update.product/product.update';
//import { authGuard } from './core/guard/auth-guard';
//import { adminGuard } from './core/guad/admin-guard';
import { SwitchPasswordComponent } from './features/login/switchpassword/switch-password';
import { LoginWeb } from './features/login/login.web';
import { MainLayoutComponent } from './features/layout/main-layout.component';
import { SupplierMain } from './features/supplier/supplier.main';
import { SupplierCreate } from './features/supplier/create.supplier/supplier.create';
import { SupplierRead } from './features/supplier/read.supplier/supplier.read';
import { SupplierUpdate } from './features/supplier/update.supplier/supplier.update';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'loginWeb' },
            { path: 'loginWeb', component: LoginWeb },
            { path: 'switchpassword', component: SwitchPasswordComponent }
        ],
    },



    {
        path: 'mainLayoutComponent', component: MainLayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'productMain' },
            {
                path: 'productMain',
                component: ProductMain,
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'productRead' },
                    { path: 'productCreate', component: ProductCreate },
                    { path: 'productRead', component: ProductRead }
                ]
            },
            {
                path: 'supplierMain',
                component: SupplierMain,
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'supplierRead' },
                    { path: 'supplierCreate', component: SupplierCreate },
                    { path: 'supplierRead', component: SupplierRead }
                ]
            }
        ]
    },

    { path: 'productUpdate/:uuid', component: ProductUpdate },
    { path: 'supplierUpdate/:id', component: SupplierUpdate },

    { path: '**', redirectTo: '' },
];
