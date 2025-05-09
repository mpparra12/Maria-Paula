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

  getEmployee()
  {
    return this.http.get<any>(`${this.apiUrl}/getEmployee`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }

  getManager()
  {
    return this.http.get<any>(`${this.apiUrl}/getManager`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }

  getPM()
  {
    return this.http.get<any>(`${this.apiUrl}/getPM`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  
  getAllTypeStatusProject()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllTypeStatusProject`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  getAllTypeProject()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllTypeProject`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  getAllTypeServiceLine()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllTypeServiceLine`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }

  getAllMarket()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllMarket`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  

  getProjectQAQC()
  {
    return this.http.get<any>(`${this.apiUrl}/getProjectQAQC`)
   // return this.http.get<any>(`${this.apiUrl}/getAllProposals`)
    
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  getbyYear()
  {
    return this.http.get<any>(`${this.apiUrl}/getbyYear`)
   // return this.http.get<any>(`${this.apiUrl}/getAllProposals`)
    
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  

  getTransaction(client_id: any)
  {
    return this.http.post<any>(`${this.apiUrl}/getTransaction`,client_id)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  
  getAllProjectDetails()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllProjectDetails`)
   // return this.http.get<any>(`${this.apiUrl}/getAllProposals`)
    
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  
  
  
  getAllNoProposal(NoProposal: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getAllNoProposal?Year=${NoProposal}`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }

  getFPbyNum(NoProposal: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getByProposalNum?NoProposal=${NoProposal}`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  
  getLastProposalNum(NoProposal: any)
  {
    return this.http.get<any>(`${this.apiUrl}/getLastProposalNum?Name=${NoProposal}`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  

  addClient(form: any){
    return this.http.post(this.apiUrl+"/AddClient",form)
  }
  updateClient(client_id:any){
    return this.http.post<any>(`${this.apiUrl}/updateClient`,client_id)
   // return this.http.put(this.apiUrl+"/updateClient",form)
  }
  
  deleteClient(client_id: any) {
    return this.http.post<any>(`${this.apiUrl}/deleteClient`,client_id)
  }

  getAllProjects()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllProjects`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }
  
  getAllProposals()
  {
    return this.http.get<any>(`${this.apiUrl}/getAllProposals`)
   // return this.http.get<any>(`${this.apiUrl}/parametros?idwp=${idwp}`)
  }

  addProposal(form: any){
    return this.http.post(this.apiUrl+"/addProposal",form)
  }

 /* login(form: LoginI){
    return this.http.post(this.apiUrl+"/login",form)
  }*/
}