import { inject, Injectable, signal } from '@angular/core';
import { IssuesApiService } from './issues-api.service';
import { Issue } from '../../feature/issues/issue.model';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private apiService = inject(IssuesApiService);

  issues = signal<Issue[]>([]);

  loading = signal(false);

  getIssues() {
    this.loading.set(true);

    this.apiService
      .fetchIssues()
      .pipe(delay(1500))
      .subscribe({
        next: (value) => {
          this.issues.set(value);
          this.loading.set(false);
        },
        error: (err) => console.log(err),
      });
  }
}
