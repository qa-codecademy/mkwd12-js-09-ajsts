import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { MoviesModule } from './feature/movies/movies.module';

@NgModule({
  //Module components/directives are always used in declarations
  declarations: [AppComponent, HeaderComponent],
  //Standalone components/directives are always used in imports
  imports: [BrowserModule, AppRoutingModule, MoviesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
