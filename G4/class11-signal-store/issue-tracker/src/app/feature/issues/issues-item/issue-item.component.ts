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
export class IssuesItemComponent {
  selectIdOutput = output<string>();

  issue = input.required<Issue>();

  onClickIssue() {
    this.selectIdOutput.emit(this.issue().id);
  }
}
