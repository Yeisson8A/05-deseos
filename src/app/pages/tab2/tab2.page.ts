import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Servicio
import { DeseosService } from '../../services/deseos.service';
// Clase con atributos necesarios para crear una lista
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  lists: Lista[] = [];

  constructor(
    private _deseosService: DeseosService, // Variable para usar el servicio creado
    private _router: Router, // Variable para usar ruteo de angular
  ) {
    this.lists = this._deseosService.getLists();
  }

  viewSelected(list: Lista) {
    // Navegar a la página para agregar items
    this._router.navigateByUrl(`/tabs/tab2/agregar/${list.id}`);
  }
}
