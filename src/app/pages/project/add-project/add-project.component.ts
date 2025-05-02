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
import { OnDestroy, Renderer2 } from '@angular/core';
import {  AsyncValidatorFn } from '@angular/forms';
//import {  Editor, Toolbar } from 'ngx-editor';
import { Observable, of } from 'rxjs';
import { Route } from '@angular/router';
import {FormControl} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-add-project',
  standalone: true,
  imports: [MatSelectModule,MatCardModule,CommonModule,
    MatIconModule, MatFormFieldModule,ReactiveFormsModule,MatDatepickerModule,
    MatNativeDateModule,
   MenuComponent, MatTooltipModule, MatButtonModule,  MatInputModule,  MatCheckboxModule],
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit {
 
  Form: FormGroup | any;
  form: FormGroup | any;
  ClientName!:any[];
  FP!:any[];
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
    this.getClient();
    this.getFP();
  }
 

 
  getClient()
  {
    this.apiServices.getClientsAll().subscribe((resp)=>{
      console.log("Client",resp);
     
      this.ClientName = resp;
      console.log("Nameclient",this.ClientName);
     
    })
  }
 
  getFP()
  {
    this.apiServices.getProjectQAQC().subscribe((resp)=>{
      console.log("FP",resp);
     
      this.FP = resp;
      console.log("NamecFPlient",this.FP);
     
    })
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
 
  SelectFP(data:any):void{
    // alert("estoy aqui");
     console.log('Selected value:', data.value);
    // debugger;
    // let idaddress=this.form.get('selectedOption')!.value;
     //console.log("add",idaddress);
     this.apiServices.getTransaction(data.value).subscribe((resp:any)=>{
       console.log('Residnec Addr:', resp);
       
      // if (resp.success) {
        // this.addresSel=resp.Address;
         
         //this.FamilySel=resp.family_id;        
   
        // alert(resp.response);
    
      // }else{
        // alert(resp.error);
       //} 
       
     });
   
   }
 
  buildForm(){
    this.form = this.fb.group({
     
      Client: ['', Validators.required],
      selectedClient: [''], 
      AgreementNo: ['', Validators.required],
      ClientProject: ['', Validators.required],
      GeneralDescription: ['', Validators.required],
      ClientProjectCost: ['', Validators.required],
      selectedFP: [''], 
      ProjectCSJ: [''],
      State:[1],
      County:['',Validators.required],
      City:[''],
      HighwayNo:[''],
      Owner:[''],
      Segment: [''],
      Bridge :[1],
      Contact :['',Validators.required],
      FP:[''],
      ProjectName:[''],
      ProjectScope:[''],
      DepartmentManager:[''],
      ProjectManager: [''],
      Task :[1],
      DECONProjectType :['',Validators.required],
      Market:[''],
      MainServiceLine:[''],
      EngineeringService:[''],
      FPRequestedDate :['',Validators.required],
      FPSenttoClien:[''],
      NTPDate:[''],
      ProjectFee:[''],
      DueDate:['']
    });

  
  }
 
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
    }
  }
 
}


