import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

interface Node {
  nodeName: string;
  nodeId: string;
  country: string;
  commerce: string;
}

@Injectable({
  providedIn: 'root',
})
export class LctComponentsService {
  constructor() {}

  storeSelected(): Node {
    const sessionStore = sessionStorage.getItem('storeSelected')!;
    return JSON.parse(sessionStore);
  }

  getCorporativeCommerce(
    _commerce: string
  ): 'FAL' | 'SOD' | 'TOT' | 'CORP' | 'MPL' | 'IKS' | 'Metro' {
    const c = _commerce?.toLowerCase();
    switch (c) {
      case 'falabella':
      case 'fal':
        return 'FAL';
      case 'sodimac':
      case 'sod':
        return 'SOD';
      case 'tottus':
      case 'tot':
        return 'TOT';
      case 'corp':
        return 'CORP';
      case 'mall plaza':
      case 'mpl':
        return 'MPL';
      case 'ikea':
      case 'iks':
        return 'IKS';
      case 'metro':
        return 'Metro';
      default:
        return 'CORP';
    }
  }

  public createHeader(): { headers: HttpHeaders } {
    const { commerce, country } = this.storeSelected();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-commerce': this.getCorporativeCommerce(commerce),
      'x-country': country || 'CL',
    };

    const httpOptions = { headers: new HttpHeaders({ ...headers }) };
    return httpOptions;
  }

  public getHeaderJson(): {
    'Content-Type': string;
    Accept: string;
    'x-commerce': string;
    'x-country': string;
    'X-chRef': string;
  } {
    const { commerce, country } = this.storeSelected();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-commerce': commerce || 'Falabella',
      'x-country': country || 'CL',
      'X-chRef': 'WEB',
    };
    return headers;
  }

  public getSimpleHeader(): { headers: HttpHeaders } {
    const { commerce, country } = this.storeSelected();
    const headers = {
      'x-commerce': this.getCorporativeCommerce(commerce),
      'x-country': country || 'CL',
      'X-chRef': 'WEB',
    };
    const httpOptions = { headers: new HttpHeaders({ ...headers }) };
    return httpOptions;
  }
}
