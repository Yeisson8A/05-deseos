import { Pipe, PipeTransform } from '@angular/core';
// Clase con atributos necesarios para crear una lista
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtroCompletado',
  // Por defecto los pipes son puros (true),
  // es decir sólo se van a llamar cuando la detección de cambio
  // ocurra en el mismo componente donde se utiliza el pipe
  pure: false
})
export class FiltroCompletadoPipe implements PipeTransform {
  transform(lists: Lista[], completado: boolean = true): Lista[] {
    return lists.filter(list => list.terminada === completado);
  }
}
