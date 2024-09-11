import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  OnDestroy,
  output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  Subscription,
} from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements AfterViewInit, OnDestroy {
  searchTerm = input<string>('');
  updateSearchTerm = output<any>();
  @ViewChild('searchInput') searchInput!: ElementRef;
  // searchInput = viewChild<ElementRef>('searchInput');
  subscription: Subscription = new Subscription();

  ngAfterViewInit() {
    this.subscription = fromEvent(this.searchInput.nativeElement, 'input')
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((event) => {
        this.updateSearchTerm.emit(event);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
