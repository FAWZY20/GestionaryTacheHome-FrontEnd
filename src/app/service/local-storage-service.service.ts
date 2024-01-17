import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {
  constructor() { }

  addItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getAllItems(excludeKey: string | null = null): { key: string; value: any }[] {
    const keys = Object.keys(localStorage);
    const filteredKeys = excludeKey ? keys.filter(key => key !== excludeKey) : keys;
    return filteredKeys.map(key => ({ key, value: localStorage.getItem(key) }));
  }
  
}
