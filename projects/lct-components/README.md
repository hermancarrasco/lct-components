
# LctComponents

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.0.

## How to use
```  
npm i lct-components --save  
```  
- Import LctComponentsModule to component module
- Add ``<lct-select></lct-select>`` to html component
- add change ``title`` attribute
- add ``options`` attribute to select options
- get value selected with ``(value)`` when select change value

# Example
### Select
```  
<lct-select   
    title="Title to component"   
    (value)="changeSelect($event)"   
    [options]="['Select one', 'One Option']]"  

>  
</lct-select>  
```  
### Select multiple
```  
<lct-select-multiple [list]="list2"  
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
></lct-input-text>  
```  
### Buttons
```  
  
<lct-button  buttonType="primary" title="Primary"></lct-button>  
  
<lct-button buttonType="secondary" title="Secondary"></lct-button>  
  
<lct-button  buttonType="error" title="Error"></lct-button>  
  
<lct-button buttonType="success" title="Success"></lct-button>  
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
| Method | Description | Example |
|-- | -- | --|
| show(): void | show overlay | this.lctLoading.show() |
| dismiss(): void | hide overlay | this.lctLoading.dismiss()|

>Version 0.1.1
>
>[(ngModel)] only can be used for:
> > lct-input-text  
> > lct-switch
