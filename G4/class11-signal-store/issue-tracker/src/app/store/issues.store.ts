import { computed, inject } from '@angular/core';
import { IssuesApiService } from '../core/services/issues-api.service';
import { Issue, IssueStatus } from '../feature/issues/issue.model';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { delay } from 'rxjs';

type IssuesState = {
  issues: Issue[];
  loading: boolean;
  filter: IssueStatus | null;
  selectedId: string;
};

const initialState: IssuesState = {
  issues: [],
  loading: false,
  filter: null,
  selectedId: '',
};

export const IssuesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, apiService = inject(IssuesApiService)) => ({
    loadIssues() {
      patchState(store, { loading: true });

      apiService
        .fetchIssues()
        .pipe(delay(1500))
        .subscribe({
          next: (value) => {
            patchState(store, { issues: value, loading: false });
            console.log('this is from the signal store', value);
          },
          error: () => {},
        });
    },
    selectIssue(issueId: string) {
      patchState(store, { selectedId: issueId });
    },
    changeIssueStatus(issueId: string, newStatus: IssueStatus) {
      const updatedIssues = store
        .issues()
        .map((issue) =>
          issue.id === issueId ? { ...issue, status: newStatus } : issue,
        );

      patchState(store, { issues: updatedIssues });
    },
    changeFilter(newFilter: IssueStatus) {
      console.log('filter changed');
      patchState(store, { filter: newFilter });
    },
  })),
  withComputed((store) => ({
    selectedIssue: computed(() =>
      store.issues().find((issue) => issue.id === store.selectedId()),
    ),
    filteredIssues: computed(() =>
      store.filter()
        ? store.issues().filter((issue) => issue.status === store.filter())
        : store.issues(),
    ),
  })),
);
