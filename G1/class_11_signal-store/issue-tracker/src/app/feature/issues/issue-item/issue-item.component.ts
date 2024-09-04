import { Component, input, output } from '@angular/core';
import { Issue } from '../issue.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-issue-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './issue-item.component.html',
  styleUrl: './issue-item.component.scss',
})
export class IssueItemComponent {
  selectedIdOutput = output<string>();

  issue = input.required<Issue>();

  onIssueClick() {
    this.selectedIdOutput.emit(this.issue().id);
  }
}
