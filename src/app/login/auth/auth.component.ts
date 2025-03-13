import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service'; 
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public loginForm!: FormGroup;
  fieldTextType!: boolean;

  /**
   *
   */
  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private renderer: Renderer2 ) {
      this.renderer.setStyle(document.body, 'background', 'url("../../../../assets/background.jpg")');
      this.renderer.setStyle(document.body, 'background-size', 'cover');
      this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
      this.renderer.setStyle(document.body, 'background-attachment', 'fixed');
    
  }
  ngOnInit(): void {
    this.spinner.show();
    this.loginForm = this.createMyForm();
    this.spinner.hide();
  }

  private createMyForm(): FormGroup {
    return this.loginForm = this.fb.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ]),
      ],
      chklogin:[],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  toggleFieldTextType() {
      this.fieldTextType = !this.fieldTextType;
    }

   submit() {
    /*  this.spinner.show();
    this.api.login(this.loginForm.value)
      .subscribe((resp:any) => {
        if (resp.success) {
          this.spinner.hide();
          localStorage.setItem('user',resp.data);
          this.router.navigate(['/tabs']); 
        }else{
          this.spinner.hide();
          alert(resp.error)
        } 
      })*/
    }
    
    

    login(perfil:number) {
   /*   this.spinner.show();
    this.api.login(this.loginForm.value)
      .subscribe((resp:any) => {
        if (resp.success) {
          this.spinner.hide();
          localStorage.setItem('user',resp.data);
          this.router.navigate(['/tabs']); 
        }else{
          this.spinner.hide();
          alert(resp.error)
        } 
      })*/
    }
        
    ForgotPassword()
    {}

}
