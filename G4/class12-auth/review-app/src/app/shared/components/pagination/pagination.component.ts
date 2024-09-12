import {
  Component,
  computed,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationOutput } from '../../shared.model';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  totalCount = input.required<number>();
  paginationOutput = output<PaginationOutput>();

  constructor() {
    effect(
      () => {
        console.log('effect runs');

        this.currentPage.set(1);

        this.paginationOutput.emit({
          firstResult: 1,
          maxResults: this.itemsPerPage(),
        });
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  currentPage = signal(1);
  itemsPerPage = model<number>(10);
  maxPages = computed(() => Math.ceil(this.totalCount() / this.itemsPerPage()));

  onChangePage(direction: 'next' | 'prev') {
    if (direction === 'next') this.currentPage.update((prev) => prev + 1);
    if (direction === 'prev') this.currentPage.update((prev) => prev - 1);

    this.paginationOutput.emit({
      firstResult: (this.currentPage() - 1) * this.itemsPerPage() + 1,
      maxResults: this.itemsPerPage(),
    });
  }
}
