import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {
  public miEventoSubject = new Subject<boolean>();

  constructor() { }
  public ChangeColor(valor: boolean) {
    this.miEventoSubject.next(valor); 
  }
}
