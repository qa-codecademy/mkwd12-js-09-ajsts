import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  totalLikes: number;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.moviesEmitter.subscribe((value) => {
      this.totalLikes = value.reduce((acc, el) => acc + el.likeCount, 0);
    });
  }
}
