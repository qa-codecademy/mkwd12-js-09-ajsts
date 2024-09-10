import { Component, inject, OnInit } from '@angular/core';
import { ReviewsService } from '../../../../core/services/reviews.service';
import { ReviewItemComponent } from '../review-item/review-item.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { PaginationOutput } from '../../../../shared/shared.model';

@Component({
  selector: 'app-reviews-list',
  standalone: true,
  imports: [ReviewItemComponent, PaginationComponent],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.scss',
})
export class ReviewsListComponent implements OnInit {
  private reviewsService = inject(ReviewsService);

  reviews = this.reviewsService.reviews;
  totalCount = this.reviewsService.totalCount;

  ngOnInit(): void {
    this.reviewsService.getReviews();
  }

  onPaginationOutput(output: PaginationOutput) {
    this.reviewsService.getReviews(output.firstResult, output.maxResults);
  }
}
