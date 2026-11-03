import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  EMPTY,
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  finalize,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Supplier } from '../../../core/models/supplier';
import { SupplierService } from '../supplier.service';

interface SupplierPageRequest {
  page: number;
  size: number;
}

@Component({
  selector: 'app-supplier-read',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './supplier.read.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierRead implements OnInit {
  private readonly supplierService = inject(SupplierService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly pageRequests = new Subject<SupplierPageRequest>();

  protected readonly filterForm = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
  });
  protected readonly suppliers = signal<Supplier[]>([]);
  protected readonly searchTerm = signal('');
  protected readonly selectedSupplier = signal<Supplier | null>(null);
  protected readonly loadError = signal<string | null>(null);
  protected readonly deletingId = signal<number | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly pageIndex = signal(0);
  protected readonly pageSize = signal(9);
  protected readonly canGoNext = computed(() => this.suppliers().length === this.pageSize());
  protected readonly filteredSuppliers = computed(() => {
    const query = this.searchTerm();
    if (!query) {
      return this.suppliers();
    }

    return this.suppliers().filter((supplier) =>
      [
        supplier.nit,
        supplier.company,
        supplier.contact,
        supplier.phoneContact,
        this.categoryNames(supplier),
      ]
        .join(' ')
        .toLocaleLowerCase()
        .includes(query),
    );
  });

  ngOnInit(): void {
    this.pageRequests
      .pipe(
        startWith({ page: this.pageIndex(), size: this.pageSize() }),
        tap(() => {
          this.isLoading.set(true);
          this.loadError.set(null);
        }),
        switchMap(({ page, size }) =>
          this.supplierService.readAllSuppliers(page, size).pipe(
            tap((suppliers) => this.suppliers.set(suppliers)),
            catchError((error: unknown) => {
              console.error('Error al cargar los proveedores', error);
              this.loadError.set('No se pudieron cargar los proveedores.');
              this.suppliers.set([]);
              return EMPTY;
            }),
            finalize(() => this.isLoading.set(false)),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

    this.filterForm.controls.search.valueChanges
      .pipe(
        startWith(this.filterForm.controls.search.value),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((value) => {
        this.searchTerm.set(value.trim().toLocaleLowerCase());
        if (this.pageIndex() !== 0) {
          this.pageIndex.set(0);
          this.loadSuppliers();
        }
      });
  }

  protected goToNextPage(): void {
    if (this.canGoNext() && !this.isLoading()) {
      this.pageIndex.update((index) => index + 1);
      this.loadSuppliers();
    }
  }

  protected goToPreviousPage(): void {
    if (this.pageIndex() > 0 && !this.isLoading()) {
      this.pageIndex.update((index) => index - 1);
      this.loadSuppliers();
    }
  }

  protected updatePageSize(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLSelectElement) {
      const pageSize = Number(target.value);
      if (pageSize === 9 || pageSize === 12) {
        this.pageSize.set(pageSize);
        this.pageIndex.set(0);
        this.loadSuppliers();
      }
    }
  }

  protected categoryNames(supplier: Supplier): string {
    return (
      supplier.idCategoryProduct
        ?.map((category) => category.nameCategoryProduct)
        .filter(Boolean)
        .join(', ') || 'Sin categorías asignadas'
    );
  }

  protected hasCompleteProfile(supplier: Supplier): boolean {
    return Boolean(
      supplier.nit?.trim() &&
      supplier.company?.trim() &&
      supplier.contact?.trim() &&
      supplier.phoneContact?.trim() &&
      supplier.idCategoryProduct?.length,
    );
  }

  protected openSupplierDetails(supplier: Supplier, event: MouseEvent): void {
    const trigger = event.currentTarget;
    if (trigger instanceof HTMLElement) {
      const actionMenu = trigger.closest('details');
      if (actionMenu) {
        actionMenu.open = false;
      }
    }

    this.selectedSupplier.set(supplier);
  }

  protected closeSupplierDetails(): void {
    this.selectedSupplier.set(null);
  }

  protected onDelete(id: number): void {
    this.deletingId.set(id);
    this.loadError.set(null);
    this.supplierService
      .deleteSupplier(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.closeSupplierDetails();
          this.deletingId.set(null);
          if (this.suppliers().length === 1 && this.pageIndex() > 0) {
            this.pageIndex.update((index) => index - 1);
          }
          this.loadSuppliers();
        },
        error: (error: unknown) => {
          console.error('Error al eliminar el proveedor', error);
          this.loadError.set('No se pudo eliminar el proveedor.');
          this.deletingId.set(null);
        },
      });
  }

  private loadSuppliers(): void {
    this.pageRequests.next({ page: this.pageIndex(), size: this.pageSize() });
  }
}
