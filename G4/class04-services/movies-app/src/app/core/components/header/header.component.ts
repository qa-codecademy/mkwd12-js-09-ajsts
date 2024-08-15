import { Component, inject, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private loggerService = inject(LoggerService);

  totalLikes = inject(MoviesService).totalLikes;

  ngOnInit(): void {
    this.loggerService.logDetails('Header');
  }
}
