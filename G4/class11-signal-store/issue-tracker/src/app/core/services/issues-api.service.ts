import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Issue } from '../../feature/issues/issue.model';

@Injectable({
  providedIn: 'root',
})
export class IssuesApiService {
  private http = inject(HttpClient);

  fetchIssues() {
    return this.http.get<Issue[]>('/data/issues.json');
  }
}
