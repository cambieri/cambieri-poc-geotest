import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private isLoading = false;

  constructor(public loadingController: LoadingController) { }

  async present(options: object) {
    this.isLoading = true;
    return await this.loadingController.create(options).then(loader => {
      loader.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          loader.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.getTop().then(value => value ? this.loadingController.dismiss() : null);
  }

}
