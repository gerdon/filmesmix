import { Component } from "@angular/core";
import { NavController, ToastController, Loading, LoadingController } from "ionic-angular";

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
    public loadingCtrl: LoadingController,
    private toast: ToastController
  ) {
    this.filmes = null;
  }

  ionViewDidEnter(){
    this.getAllFilmes();
  }

  ionViewDidLeave(){
    this.filmes = null;
  }

  getAllFilmes() {
    let loading = this.showLoading();

    this.filmeProvider
      .getAll()
      .then(result => {
        console.log(result);
        this.filmes = result;
        loading.dismiss();
      })
      .catch(error => {
        this.toast
          .create({
            message: "Erro ao tentar obter filmes: " + error.error,
            position: "botton",
            duration: 5000
          })
          .present();
        loading.dismiss();
      });
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
}
