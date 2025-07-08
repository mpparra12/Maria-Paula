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
import { HttpClient } from '@angular/common/http';
//import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import { FileInput } from 'ngx-material-file-input';

@Component({
  selector: 'app-add-contacts',
  standalone: true,
  imports: [MatSelectModule,MatCardModule,CommonModule,
        MatIconModule, MatFormFieldModule,ReactiveFormsModule,MatDatepickerModule,
        MatNativeDateModule,
       MenuComponent, MatTooltipModule, MatButtonModule,  MatInputModule,  MatCheckboxModule],
  templateUrl: './add-contacts.component.html',
  styleUrl: './add-contacts.component.css'
})
export class AddContactsComponent { 
 selectedFile: File | null = null;
  Form: FormGroup | any;
  form: FormGroup | any;
  residentType!:any[];
  address!:any;
  resident!:any;
  owneradd!:any;
  residenceId!:any;
  residentCode!:any[];

  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private apiServices: ApiService,
    private http: HttpClient,
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
 
      onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
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
 
      onFileChange(event:any) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0) {
      const file = files[0];
      this.form.patchValue({
        document: file
      });
    }
  }
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
 

    onSubmit2(): void {
    if (!this.selectedFile) {
        return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('Name',this.form.get('Name')!.value);
    formData.append('Address', this.form.get('Address')!.value);
    formData.append('City',this.form.get('City')!.value);
    formData.append('State',this.form.get('State')!.value);
    formData.append('ZipCode',this.form.get('ZipCode')!.value);
    formData.append('Logo',this.form.get('Logo')!.value);
    formData.append('Active',this.form.get('Active')!.value);
    formData.append('Country',this.form.get('Country')!.value);
    formData.append('Period_of_Invoice',this.form.get('Period_of_Invoice')!.value);
    formData.append('Invoice_Date',this.form.get('Invoice_Date')!.value);
    formData.append('IdClient', '');
    formData.append('Documents_and_other_requirements','');
    formData.append('Procedure',this.form.get('Procedure')!.value);

         console.log('Pase el formulario',formData);
   
      this.apiServices.addClient(formData).subscribe((resp:any)=>{
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


   /* this.http.post('<API_ENDPOINT_URL>', formData).subscribe(
        response => console.log('File uploaded successfully:', response),
        error => console.error('File upload failed:', error)
    );    */
  }


 onSubmit() {
  const formData = new FormData();

  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  } else {
    alert('Por favor selecciona un archivo antes de enviar.');
    return;
  }

  formData.append('Name', this.form.get('Name')!.value);
  formData.append('Address', this.form.get('Address')!.value);
  formData.append('City', this.form.get('City')!.value);
  formData.append('State', this.form.get('State')!.value);
  formData.append('ZipCode', this.form.get('ZipCode')!.value);
  formData.append('Logo', this.form.get('Logo')!.value);
  formData.append('Active', this.form.get('Active')!.value);
  formData.append('Country', this.form.get('Country')!.value);
  formData.append('Period_of_Invoice', this.form.get('Period_of_Invoice')!.value);
  formData.append('Invoice_Date', this.form.get('Invoice_Date')!.value);
  formData.append('Documents_and_other_requirements', '');
  formData.append('Procedure', this.form.get('Procedure')!.value);

  this.apiServices.addClient(formData).subscribe(
    (resp: any) => {
      console.log('Respuesta del servidor:', resp);
      if (resp.success) {
        alert(resp.response);
      } else {
        alert(resp.error);
      }
    },
    (error) => {
      console.error('Error al enviar formulario:', error);
    }
  );
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
 

 
}


