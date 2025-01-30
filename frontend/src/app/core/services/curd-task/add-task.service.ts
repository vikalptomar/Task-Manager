import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddTaskService {
  url = `${environment.domainUrl}api/todotask`;

  constructor(private http: HttpClient) {}

  getAllTask() {
    return this.http.get(this.url);
  }

  getTaskbyId(id: any) {
    return this.http.get(`${this.url}/${id}`);
  }

  addTask(data: any) {
    return this.http.post(this.url, data);
  }

  updateTask(id: any, data: any) {
    return this.http.put(`${this.url}/${id}`, data);
  }

  delTask(id:any){
    return this.http.delete(`${this.url}/${id}`)
  }

  delAllTask(){
    return this.http.delete(this.url)
  }
}
