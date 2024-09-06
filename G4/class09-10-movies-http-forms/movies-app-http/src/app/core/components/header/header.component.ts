import { Component, inject, OnInit } from '@angular/core';
import { LoggerService } from '../../services/logger.service';
import { MoviesService } from '../../services/movies.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  //RouterLink is used to create links that route in angular and RouterLinkActive is used to apply css classes on active routes
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  private loggerService = inject(LoggerService);

  ngOnInit(): void {
    this.loggerService.logDetails('Header');
  }
}
