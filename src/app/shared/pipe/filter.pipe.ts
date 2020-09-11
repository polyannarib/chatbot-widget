// import { Pipe, PipeTransform } from '@angular/core';

/*
 * Filtra listas por string buscada, retornando uma nova array
 * Uma string extra pode ser informada para ser usada como chave quando é array de objetos
 *
 * Usage:
 *   items | filter: searchText:key
 *
 * Example:
 *   <option *ngFor="let item of (['a', 'b', 'c'] | filter: 'b')" [ngValue]="item"> {{ item }} </option>
 *   formats to: ['b']
 *
 *   or
 *
 *   <option *ngFor="let item of ([{id: 1, name:'a'}, {id: 2, name:'b'}, {id: 3, name:'c'}] | filter: 'b':'name')" [ngValue]="item">
 *      {{ item.name }}
 *   </option>
 *   formats to: [{id: 2, name:'b'}]
*/
// @Pipe({
//   name: 'filterList'
// })
// export class FilterListPipe implements PipeTransform {
//   transform(items: any[], searchText: string, key?: string): any[] {
//     if (!items) { return []; }
//     if (!searchText) { return items; }
//     searchText = searchText.toLowerCase();
//     return items.filter( it => {
//       if (!key) {
//         return it.toLowerCase().includes(searchText);
//       } else {
//         return it[key].toLowerCase().includes(searchText);
//       }
//     });
//    }
// }
