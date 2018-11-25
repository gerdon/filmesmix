import { Component } from "@angular/core";
import { NavController, ToastController, LoadingController, Loading } from "ionic-angular";

import { Filme } from "./../../models/filme.model";

import { FilmeProvider } from "./../../providers/filme/filme";

// declare const Buffer;

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

  private fileImage: File;

  constructor(
    public navCtrl: NavController,
    public filmeProvider: FilmeProvider,
    public loadingCtrl: LoadingController,
    private toast: ToastController
  ) {}

  createFilme() {
    let loading = this.showLoading();

    console.log(this.filme.imagem);
    // this.filme.imagem = this.fileImage;

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
        loading.dismiss();
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
        loading.dismiss();
      });
  }

  onImage(event) {
    console.log(event.target.files);
    this.fileImage = event.target.files[0];
  }

  /**
   * Exibe o load para informar o carregamento
   */
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });

    loading.present();

    return loading;
  }

  // base64_decode(base64str): any {
  //   var bitmap: any;
  //   return bitmap = new Buffer(base64str, "base64");
  // }

  // base64_encode(bitmap) {
  //   return new Buffer(bitmap).toString("base64");
  // }
}
