import { inject, Injectable, signal } from '@angular/core';
import { IssuesApiService } from './issues-api.service';
import { delay } from 'rxjs';
import { Issue, IssueStatus } from '../../feature/issues/issue.model';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private apiService = inject(IssuesApiService);

  issues = signal<Issue[]>([]);
  loading = signal(false);
  filteredIssues = signal<Issue[]>([]);
  filter: IssueStatus;

  getIssues() {
    this.loading.set(true);

    this.apiService
      .fetchIssues()
      .pipe(delay(1000))
      .subscribe({
        next: (value) => {
          this.issues.set(value);
          this.loading.set(false);
        },
        error: (err) => console.log(err),
      });
  }
}
