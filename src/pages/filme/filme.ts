import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";

import { Filme } from "./../../models/filme.model";

import { FilmeProvider } from "./../../providers/filme/filme";

@Component({
  selector: "page-filme",
  templateUrl: "filme.html"
})
export class FilmePage {
  filme: any = {
    imagem: "",
    nome: "",
    categoria: "",
    duracao: ""
  };

  constructor(
    public navCtrl: NavController,
    public filmeProvider: FilmeProvider,
    private toast: ToastController
  ) {}

  createFilme() {
    this.filmeProvider
      .createFilme(this.filme)
      .then(result => {
        console.log(JSON.stringify(result));
        this.toast
          .create({
            message: "Filme criado com sucesso",
            position: "botton",
            duration: 5000
          })
          .present();
      })
      .catch(error => {
        console.log(JSON.stringify(error));
        this.toast
          .create({
            message: "Erro ao tentar criar o filme",
            position: "botton",
            duration: 5000
          })
          .present();
      });
  }
}
