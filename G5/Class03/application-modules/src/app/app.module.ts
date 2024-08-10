import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TodosModule } from './components/todos/todos.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, NavigationComponent],
  imports: [BrowserModule, AppRoutingModule, TodosModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
