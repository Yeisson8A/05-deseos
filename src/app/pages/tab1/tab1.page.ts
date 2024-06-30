import { Component } from '@angular/core';

// Servicio
import { DeseosService } from '../../services/deseos.service';

// Clase con atributos definidos para la lista
import { Lista } from '../../models/lista.model';

// Ruteo
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  lists: Lista[] = [];

  constructor(
    private _deseosService: DeseosService, // Variable para usar el servicio creado
    private _router: Router, // Variable para usar ruteo de angular
    private _alertController: AlertController // Variable para usar componente ionic AlertController
  ) {
    this.lists = this._deseosService.getLists();
  }

  async addList() {
    const alert = await this._alertController.create({
      header: 'Nueva lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => console.log('Cancelar')
        },
        {
          text: 'Crear',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }

            // Crear la lista
            const listId = this._deseosService.createList(data.titulo);
            // Navegar a la página para agregar items
            this._router.navigateByUrl(`/tabs/tab1/agregar/${listId}`);
          }
        }
      ]
    });

    alert.present();
  }

  viewSelected(list: Lista) {
    // Navegar a la página para agregar items
    this._router.navigateByUrl(`/tabs/tab1/agregar/${list.id}`);
  }
}
