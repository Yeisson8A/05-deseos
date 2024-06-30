import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AlertController, IonItemSliding } from '@ionic/angular';

// Clase con atributos necesarios para crear lista
import { Lista } from '../../models/lista.model';
// Servicio
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
  // Con el decorador @Input indicamos que el valor
  // para el atributo heroe puede venir de afuera.
  // De igual modo también puedo inicializarlo en el constructor
  @Input() lists: Lista[] = [];
  @Input() terminado: boolean;
  // Con el decorador @Output indicamos un evento de salida,
  // en este caso debemos especificar el tipo de dato que se va a emitir.
  @Output() listSelected: EventEmitter<Lista>;

  constructor(
    private _deseosService: DeseosService, // Variable para manejar servicio creado
    private _alertController: AlertController // Variable para usar funcionalidad ionic AlertController
  ) {
    // Inicializamos el evento de salida creado
    this.listSelected = new EventEmitter();
  }

  ngOnInit() {}

  // Método que va a mandar la información hasta el componente padre
  viewSelected(list: Lista) {
    // Emitimos la variable index
    this.listSelected.emit(list);
  }

  // Método que permite borrar una lista
  delete(list: Lista) {
    this.lists = this._deseosService.deleteList(list);
  }

  // Método que permite editar el titulo de una lista
  async edit(list: Lista, slidingItem: IonItemSliding) {
    const alert = await this._alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: list.titulo,
          placeholder: 'Nombre de la lista'
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
            list.titulo = data.titulo;
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
