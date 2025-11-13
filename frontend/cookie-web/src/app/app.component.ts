import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<h1>{{title}}<h1>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public refresh = false;

  refreshMenu(): void {
    this.refresh = true;
  }

  finishedRefreshing(): void {
    this.refresh = false;
  }

  getRefresh(): boolean {
    return this.refresh;
  }
}
