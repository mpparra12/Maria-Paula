import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent{
  isLogged: boolean = false;
  isAdmin: boolean = false;
  /**
   *
   */
  constructor(private _route: RouterModule) {
   
  /*let user= JSON.parse( localStorage.getItem('user')!);
 
  var admin = user.rol;
  console.log("rol",admin);
  if (admin=='administrator' || admin=='contributor' || admin=='author')
    this.isLogged=true;
  if (admin=='author')
    this.isAdmin=true;    
  console.log("isLoggedIn",this.isLogged);*/
}

@Input() headerName: string="Avalon";


logout(): void {
  localStorage.removeItem('user');
  location.href = "https://avalonsevenmeadows.org/";
  //this._route.navigate(['/login']);
}

isLoggedIn(): boolean {

  return localStorage.getItem('user') !== null;
}
}