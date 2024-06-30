import { Injectable } from '@angular/core';

// Clase con los atributos necesarios para la lista
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  lists: Lista[] = [];

  constructor() {
    this.loadStorage();
    /* const lista1 = new Lista('Recolectar piedras del infinito');
    const lista2 = new Lista('Héroes a desaparecer');
    this.lists.push(lista1, lista2); */
  }

  // Método para obtener lista a mostrar
  getLists(): Lista[] {
    return this.lists;
  }

  // Método para crear una nueva lista
  createList(titulo: string): number {
    const nuevaLista = new Lista(titulo);
    this.lists.push(nuevaLista);
    this.saveStorage();

    return nuevaLista.id;
  }

  // Método para buscar lista según el id
  getList(id: string | number) {
    id = Number(id);
    return this.lists.find(listData => listData.id === id);
  }

  // Método para eliminar una lista según el id
  deleteList(list: Lista) {
    this.lists = this.lists.filter(listData => listData.id !== list.id);
    this.saveStorage();
    return this.lists;
  }

  // Método para grabar fisicamente información en el storage
  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.lists));
  }

  // Método para cargar información que tengamos en el storage
  loadStorage() {
    // Validamos que el objeto exista en el localStorage
    if (localStorage.getItem('data')) {
      this.lists = JSON.parse(localStorage.getItem('data'));
    } else {
      this.lists = [];
    }
  }
}
