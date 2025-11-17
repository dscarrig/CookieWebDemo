import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class HelloWorldBean {
  constructor(public message: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {
  private http = inject(HttpClient);

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
  }

  executeHelloWorldServiceWithPathVariable(name) {

    return this.http.get<HelloWorldBean>(`http://localhost:8080/hello-world/path-variable/${name}`);

  }

}
