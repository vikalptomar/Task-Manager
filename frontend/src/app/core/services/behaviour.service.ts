import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviourService {

  private id=new BehaviorSubject<any>("");

  constructor() { }
  setId(id:any){
    this.id.next(id)
  }
  
  getId(){
    return this.id.asObservable()
  }
}
