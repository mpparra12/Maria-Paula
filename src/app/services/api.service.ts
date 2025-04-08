import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { LoginI } from '../pages/models/login.interface';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 
  private apiUrlWP = 'https://avalonsevenmeadows.org/wp-json/wp/v2/pages';
   apiUrl="http://gonzalad2016-001-site8.ntempurl.com/index.php/api/decon";
   //apiUrl="http://decon_api.test";

  constructor(private http: HttpClient) { }
 
  getPageContent(pageId: number) {
 
    return this.http.get<any>(`${this.apiUrlWP}/${pageId}`);
 
}
 
  getClientsAll()
  {
    return this.http.get<any>(`${this.apiUrl}/getAll`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }

  addClient(form: any){
    return this.http.post(this.apiUrl+"/AddClient",form)
  }
 

 /* login(form: LoginI){
    return this.http.post(this.apiUrl+"/login",form)
  }*/
}