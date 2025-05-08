import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../../../components/menu/menu/menu.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [ MatSelectModule,MatCardModule,CommonModule,
        MatIconModule, MatFormFieldModule,ReactiveFormsModule,MatDatepickerModule,
        MatNativeDateModule,
       MenuComponent, MatTooltipModule, MatButtonModule,  MatInputModule,  MatCheckboxModule
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent implements OnInit {
 
  Form: FormGroup | any;
  form: FormGroup | any;
  residentType!:any[];
  address!:any;
  resident!:any;
  owneradd!:any;
  residenceId!:any;
  residentCode!:any[];
  selectedFile: File | null = null;
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private apiServices: ApiService,
    private _route: Router
    ) {
 
      /*if( _route.getCurrentNavigation()!.extras.state)
        {
        let data = this._route.getCurrentNavigation()?.extras.state!['owner'];
        console.log("owner en Add",data);
        this.owneradd=data.owner.family_id;
        this.residenceId=data.owner.residence_id;
 
        }*/
 
      this.buildForm();
    }
 
  ngOnInit(): void {
    //this.getResidentType();
    //this.getResidentCode();
  }
 

 
 /* getResidentType()
  {
    this.apiServices.getResidentType().subscribe((resp)=>{
      console.log("ResidenstType",resp);
     
      this.residentType = resp;
      console.log("Address",this.residentType);
     
    })
  }*/
 
  onSubmit1() {
    debugger;
    if (this.form.valid) {
      // Lógica para manejar el envío del formulario aquí
      console.log(this.form);
    } else {
      // Marcar los campos como tocados para mostrar los mensajes de error
      Object.values(this.form.controls).forEach(control => {
        (control as any).markAsTouched(); // Usa una afirmación de tipo
      });
    }
    this.apiServices.addClient(this.form).subscribe((resp)=>{
      console.log("ClientNew",resp);
     
     // this.resp = resp;
      //console.log("Address",this.residentType);
     
    })
   
  }
 
 /* getResidentCode()
  {
    console.log("GetGateDirectory",this.residenceId);
    this.apiServices.GetGateDirectory(this.residenceId).subscribe((resp)=>{
      console.log("GetGateDirectory",resp);
     
      this.residentCode = resp.residentCode;
      console.log("Address",this.residentCode);
     
    })
  }*/
 
  onSubmit() {
    //debugger;
    console.log('Estoy en Submit:');
      this.Form = this.fb.group({
        Name:[this.form.get('Name')!.value],
        Address:[ this.form.get('Address')!.value],
        City:[this.form.get('City')!.value],
        State:[this.form.get('State')!.value],
        ZipCode:[this.form.get('ZipCode')!.value],
        Logo:[this.form.get('Logo')!.value],
        Active:[this.form.get('Active')!.value],
        Country:[this.form.get('Country')!.value],
        Period_of_Invoice:[this.form.get('Period_of_Invoice')!.value],
        Invoice_Date:[this.form.get('Invoice_Date')!.value],
        IdClient: null,
        Documents_and_other_requirements:null,
        Procedure:[this.form.get('Procedure')!.value]
     })
 
     console.log('Pase el formulario',this.Form);
   
      this.apiServices.addClient(this.Form.value).subscribe((resp:any)=>{
        console.log('Formulario enviado a nuevo cliente:', resp);
        if (resp.success) {
            alert(resp.response);
            }
        else{
              alert(resp.error);
            }
           
          });
          //this.myForm.reset();
         // alert(resp.response);
         this.back();
        }
     
 
     
   
   
   
    // Verificar si el formulario es válido
   
 
 
 
  back(){
    this._route.navigate(['/ListClient']);
  }
 
 
 
  buildForm(){
    this.form = this.fb.group({
     
      Name: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      ZipCode: ['', Validators.required],
      Logo: [''],
      Active:[1],
      Country:['',Validators.required],
      Period_of_Invoice:[''],
      Invoice_Date:[''],
      Procedure:['']
    
 
    });

  
  }
 
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
    }
  }
 
}


