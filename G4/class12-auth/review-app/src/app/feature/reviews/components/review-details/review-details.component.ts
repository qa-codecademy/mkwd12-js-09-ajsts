import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from '../../../../core/services/reviews.service';
import { JsonPipe } from '@angular/common';
import { CommentsListComponent } from '../comments-list/comments-list.component';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ReviewComment } from '../../review.model';

@Component({
  selector: 'app-review-details',
  standalone: true,
  imports: [
    JsonPipe,
    CommentsListComponent,
    CommentFormComponent,
    ButtonComponent,
  ],
  templateUrl: './review-details.component.html',
  styleUrl: './review-details.component.scss',
})
export class ReviewDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private reviewsService = inject(ReviewsService);

  selectedReview = this.reviewsService.selectedReview;
  genresArr = computed(() => this.selectedReview().genres.split(', '));

  comments = this.reviewsService.comments;
  commentsTotalCount = this.reviewsService.commentsTotalCount;
  currentPage = signal(1);
  maxPages = computed(() => Math.ceil(this.commentsTotalCount() / 10));

  ngOnInit() {
    document.addEventListener('scroll', (event: any) => {
      console.log(event);
    });

    const id = this.route.snapshot.params.id;

    this.reviewsService.getReviewById(id);
  }

  onAddComment(text: string) {
    this.currentPage.set(1);
    this.reviewsService.createReviewComment(this.selectedReview().id, text);
  }

  onLoadmore() {
    this.currentPage.update((prev) => prev + 1);

    this.reviewsService.getReviewComments(
      this.selectedReview().id,
      (this.currentPage() - 1) * 10 + 1,
      10
    );
  }
}
