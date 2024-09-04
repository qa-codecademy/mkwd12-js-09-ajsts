import { Component, effect, inject } from '@angular/core';
import { IssuesStore } from '../../../store/issues.store';
import { CommonModule } from '@angular/common';
import { IssueStatus } from '../issue.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.scss',
})
export class IssueDetailsComponent {
  private store = inject(IssuesStore);

  changeStatusCtrl = new FormControl<IssueStatus>(null);

  issueStatus = IssueStatus;

  selectedIssue = this.store.selectedIssue;

  constructor() {
    effect(() => {
      if (!this.selectedIssue()) return;

      this.changeStatusCtrl.setValue(this.selectedIssue().status);
    });
  }

  onChangeStatus() {
    this.store.changeIssueStatus(
      this.selectedIssue().id,
      this.changeStatusCtrl.value,
    );
  }
}
