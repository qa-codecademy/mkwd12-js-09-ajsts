import { Component, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IssueStatus } from '../issue.model';
import { IssuesStore } from '../../../store/issues.store';
import { NgClass, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-issues-details',
  standalone: true,
  imports: [NgClass, UpperCasePipe, ReactiveFormsModule],
  templateUrl: './issues-details.component.html',
  styleUrl: './issues-details.component.scss',
})
export class IssuesDetailsComponent {
  private store = inject(IssuesStore);

  constructor() {
    effect(() => {
      if (!this.selectedIssue()) return;

      this.changeStatusCtrl.setValue(this.selectedIssue().status);
    });
  }

  selectedIssue = this.store.selectedIssue;
  changeStatusCtrl = new FormControl<IssueStatus>(null);
  issueStatus = IssueStatus;

  onStatusChange() {
    this.store.changeIssueStatus(
      this.selectedIssue().id,
      this.changeStatusCtrl.value,
    );
  }
}
