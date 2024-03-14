# LctComponents

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## How to use

```
npm i lct-components --save
```

- Import LctComponentsModule to component module
- Add `<lct-select></lct-select>` to html component
- add change `title` attribute
- add `options` attribute to select options
- get value selected with `(value)` when select change value

# Example

### Select

```
<lct-select
    title="Title to component"
    placeholder="Select option"
    (value)="changeSelect($event)"
    [options]="['Option one', 'option two']]"
>
</lct-select>
```

### Select multiple

```
<lct-select-multiple [list]="list2"
                     placeholder="select options"
                     title="Insert title"
                     (shareCheckedList)="shareCheckedList($event)"
                     (shareIndividualCheckedList)="myFunction($event)">
</lct-select-multiple>
```

#### Input Text

```
<lct-input-text
  icon="assets/img/keyboard.svg"
  [showIcon]="true"
  (iconClick)="myFunction()"
  placeholder="Insert placeholder"
  [(ngModel)]="value"
  (enterEmitted)="myFunctionEnter($event)"
  iconPosition="right"
  title="Insert title"
></lct-input-text>

<lct-input-text
  [disabled]="true"
  icon="assets/img/keyboard.svg"
  [showIcon]="true"
  (iconClick)="myFunction()"
  (enterEmitted)="myFunctionEnter($event)"
  iconPosition="left"
></lct-input-text>

<lct-input-text
  (enterEmitted)="myFunctionEnter($event)"
  [(ngModel)]="value"
></lct-input-text>
```

### Buttons

```

<lct-button  buttonType="primary" title="Primary"></lct-button>

<lct-button buttonType="secondary" title="Secondary"></lct-button>

<lct-button  buttonType="error" title="Error"></lct-button>

<lct-button buttonType="success" title="Success"></lct-button>
```

### tooltip directive

```

<lct-button
  buttonType="primary"
  title="Primary"
  lctTooltip
  tooltipText="Tooltip from button 1"
  position="right"
  color="tertiary"
></lct-button>

<lct-button
  buttonType="secondary"
  title="Secondary"
  lctTooltip
  tooltipText="Tooltip from button 2"
  position="top"
  marginBottom="55px"
  color="primary"
  ></lct-button>

<lct-button
  [title]="'Estoy en'"
  buttonType="secondary"
  icon="./assets/img/Tienda.svg"
  lctModalTooltip
  [dateVersion]="'10/08/2022'"
  [version]="'1.0.0'"
  [widthModalConfig]="'458px'"
  [heightModalConfig]="'268px'"
  [nodes]="tiendas"
  (changeNode)="changeNode($event)"
  (openModalChangeNode)="openModalChangeNode($event)"
  [country]="'CL'"
  ></lct-button>
```

### Overlay loading

```
yourComponent.html
...

<lct-loading #lctLoading></lct-loading>

...
-----------------------------------------------------------
yourComponent.ts
...
@ViewChild('lctLoading') lctLoading!: LoadingComponent;
...


```

| Method          | Description  | Example                   |
| --------------- | ------------ | ------------------------- |
| show(): void    | show overlay | this.lctLoading.show()    |
| dismiss(): void | hide overlay | this.lctLoading.dismiss() |

> Version 0.9.8
>
> [(ngModel)] Can only be used at the moment for:
>
> > lct-input-text  
> > lct-switch
