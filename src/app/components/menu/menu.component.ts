import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu = [
    {
      title: 'buttons',
      items: [
        {
          title: 'button simple',
          key: 'buttonSimple'
        },
        {
          title: 'button with icon',
          key: 'buttonWithIcon'
        },
        {
          title: 'button round',
          key: 'buttonRound'
        },
        {
          title: 'button with counter',
          key: 'buttonWithCounter'
        },
      ]
    },
    {
      title: 'inputs',
      items: [
        {
          title: 'input simple',
          key: 'inputSimple'
        },
        {
          title: 'input with icon',
          key: 'inputWithIcon'
        }
      ]
    },
    {
      title: 'selects',
      items: [
        {
          title: 'select simple',
          key: 'selectSimple'
        },
        {
          title: 'select multiple',
          key: 'selectMultiple'
        },
        {
          title: 'select multiple nested',
          key: 'selectMultipleNested'
        }
      ]
    },
    {
      title: 'switch',
      items: [
        {
          title: 'switch',
          key: 'switch'
        }
      ]
    },
    {
      title: 'tooltip',
      items: [
        {
          title: 'tooltip',
          key: 'tooltip'
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
