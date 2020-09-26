import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: '<h1>{{title}}<h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public refresh = false;

  refreshMenu() {
    this.refresh = true;
  }

  finishedRefreshing() {
    this.refresh = false;
  }

  getRefresh() {
    return this.refresh;
  }
}
