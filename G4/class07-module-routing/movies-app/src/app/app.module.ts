import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MoviesModule } from './feature/movies/movies.module';
import { HomeComponent } from './feature/home/home.component';
import { AboutComponent } from './feature/about/about.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

@NgModule({
  //Module components/directives are always used in declarations
  declarations: [AppComponent, HeaderComponent, HomeComponent, AboutComponent, NotFoundComponent],
  //Standalone components/directives are always used in imports
  imports: [BrowserModule, AppRoutingModule, MoviesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
