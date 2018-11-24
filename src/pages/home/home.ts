import { Component } from "@angular/core";
import { NavController, ToastController } from "ionic-angular";

import { FilmeProvider } from "../../providers/filme/filme";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  filmes: any;

  constructor(
    public navCtrl: NavController,
    public filmeProvider: FilmeProvider,
    private toast: ToastController
  ) {
    this.filmes = null;
  }

  ionViewDidLoad() {
    this.getAllFilmes();
  }

  getAllFilmes() {
    this.filmeProvider
      .getAll()
      .then(result => {
        console.log(result);
        this.filmes = result;
      })
      .catch(error => {
        this.toast
          .create({
            message: "Erro ao tentar obter filmes: " + error.error,
            position: "botton",
            duration: 5000
          })
          .present();
      });
  }
}
