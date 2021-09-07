# Select

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

##How to
```
npm i lct-select --save
```
- Import LctSelectModule to component module
- Add ``<lct-select></lct-select>`` to html component
- add change ``title`` attribute
- add ``options`` attribute to select options
- get value selected with ``(value)`` when select change value

## Example

```
<lct-select title="Operadores log" (value)="changeSelect($event)" [options]="['Select one', 'One Option']]"></lct-select>
```
