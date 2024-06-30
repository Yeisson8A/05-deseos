import { Component, OnInit } from '@angular/core';
import { AlertController, IonItemSliding } from '@ionic/angular';

// Services
import { DeseosService } from '../../services/deseos.service';

// Ruteo
import { ActivatedRoute } from '@angular/router';

// Clase con los atributos necesarios de una lista
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  list: Lista;
  nameItem = '';

  constructor(
    private _deseosService: DeseosService, // Variable para usar el servicio creado
    private _activatedRoute: ActivatedRoute, // Variable para manipular parámetros pasados en la url
    private _alertController: AlertController // Variable para usar funcionalidad ionic AlertController
  ) {
    const id = this._activatedRoute.snapshot.paramMap.get('listId');
    this.list = this._deseosService.getList(id);
  }

  ngOnInit() {
  }

  addItem() {
    if (this.nameItem.length === 0) {
      return;
    }

    const newItem = new ListaItem(this.nameItem);
    this.list.items.push(newItem);
    this.nameItem = '';
    // Grabar modificaciones en el localStorage
    this._deseosService.saveStorage();
  }

  changeCheck(item: ListaItem) {
    // Obtenemos las tareas pendientes
    const pendientes = this.list.items
                           .filter(itemData => !itemData.completado)
                           .length;

    // Colocar lista como terminada si no tiene tareas pendientes
    if (pendientes === 0) {
      this.list.terminadaEn = new Date();
      this.list.terminada = true;
    } else {
      this.list.terminadaEn = null;
      this.list.terminada = false;
    }
    // Grabar modificaciones en el localStorage
    this._deseosService.saveStorage();
  }

  delete(index: number) {
    this.list.items.splice(index, 1);
    // Grabar modificaciones en el localStorage
    this._deseosService.saveStorage();
  }

  // Método que permite editar el titulo de una lista
  async edit(item: ListaItem, slidingItem: IonItemSliding) {
    const alert = await this._alertController.create({
      header: 'Editar item',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: item.descripcion,
          placeholder: 'Nombre del item'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
            // Cerrar sliding
            slidingItem.close();
          }
        },
        {
          text: 'Editar',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }

            // Asignar nuevo titulo a la lista
            item.descripcion = data.titulo;
            // Grabar modificaciones en el localStorage
            this._deseosService.saveStorage();
            // Cerrar sliding
            slidingItem.close();
          }
        }
      ]
    });

    alert.present();
  }
}
