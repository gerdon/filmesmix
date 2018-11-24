import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";

import { Filme } from "./../../models/filme.model";

@Injectable()
export class FilmeProvider {
  private api_url = "http://127.0.0.1:3000/";

  constructor(public http: HttpClient) {}

  createFilme(filme) {
    return new Promise((resolve, reject) => {
      this.http.post(this.api_url + "filmes/", filme).subscribe(
        (result: any) => {
          resolve(result);
        },
        error => {
          reject(error);
        }
      );
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.http.get(this.api_url + "filmes/").subscribe(
        (result: any) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
