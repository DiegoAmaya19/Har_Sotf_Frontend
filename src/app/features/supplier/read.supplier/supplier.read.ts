import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Supplier } from '../../../core/models/supplier';
import { SupplierService } from '../supplier.service';

@Component({
    selector: 'app-supplier-read',
    imports: [RouterLink],
    templateUrl: './supplier.read.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierRead implements OnInit {
    private readonly supplierService = inject(SupplierService);
    protected readonly suppliers = signal<Supplier[]>([]);
    protected readonly searchTerm = signal('');
    protected readonly selectedSupplier = signal<Supplier | null>(null);
    protected readonly loadError = signal<string | null>(null);
    protected readonly deletingId = signal<number | null>(null);
    protected readonly filteredSuppliers = computed(() => {
        const query = this.searchTerm().trim().toLocaleLowerCase();
        if (!query) {
            return this.suppliers();
        }

        return this.suppliers().filter((supplier) =>
            [supplier.nit, supplier.company, supplier.contact, supplier.phoneContact]
                .join(' ')
                .toLocaleLowerCase()
                .includes(query),
        );
    });

    ngOnInit(): void {
        this.loadSuppliers();
    }

    protected onSearchInput(event: Event): void {
        const target = event.target;
        if (target instanceof HTMLInputElement) {
            this.searchTerm.set(target.value);
        }
    }

    protected categoryNames(supplier: Supplier): string {
        return supplier.idCategoryProduct.map((category) => category.nameCategoryProduct).join(', ')
            || 'Sin categorías asignadas';
    }

    protected closeSupplierDetails(): void {
        this.selectedSupplier.set(null);
    }

    protected onDelete(id: number): void {
        this.deletingId.set(id);
        this.loadError.set(null);
        this.supplierService.deleteSupplier(id).subscribe({
            next: () => {
                this.suppliers.update((suppliers) => suppliers.filter((supplier) => supplier.idSupplier !== id));
                this.closeSupplierDetails();
                this.deletingId.set(null);
            },
            error: (error) => {
                console.error('Error al eliminar el proveedor', error);
                this.loadError.set('No se pudo eliminar el proveedor.');
                this.deletingId.set(null);
            },
        });
    }

    private loadSuppliers(): void {
        this.supplierService.readAllSuppliers().subscribe({
            next: (suppliers) => {
                this.suppliers.set(suppliers);
                this.loadError.set(null);
            },
            error: (error) => {
                console.error('Error al cargar los proveedores', error);
                this.loadError.set('No se pudieron cargar los proveedores.');
            },
        });
    }
}
