import { Component } from "@angular/core";
import { NavController, ToastController, LoadingController, Loading } from "ionic-angular";

import { FilmeProvider } from "./../../providers/filme/filme";

import { ImagePicker } from '@ionic-native/image-picker';

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

  private imagem: any = '../../assets/imgs/back.jpg'

  constructor(
    public filmeProvider: FilmeProvider,
    private imagePicker: ImagePicker,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private toast: ToastController
  ) {}

  createFilme() {
    let loading = this.showLoading();

    this.filme.imagem = this.imagem;

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

  /**
   * Obtendo e convertendo imagem em Base64 para armazenar no banco
   */
  getImagem() {
    let options = {
      maximumImagesCount: 1,
      outputType: 1 //Retorna o arquivo em Base64
    };

    //Transforma a imagem em Base64
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          this.imagem = 'data:image/jpeg;base64,' + results[i];
      }
    }, (err) => { });
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
