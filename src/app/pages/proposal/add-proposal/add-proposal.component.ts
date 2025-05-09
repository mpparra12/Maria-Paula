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
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-add-proposal',
  standalone: true,
  imports: [MatCardModule,CommonModule,
    MatIconModule, MatFormFieldModule,ReactiveFormsModule,MatSelectModule,MatDatepickerModule, MatNativeDateModule,
   MenuComponent, MatTooltipModule, MatButtonModule,  MatInputModule,  MatCheckboxModule],
  templateUrl: './add-proposal.component.html',
  styleUrl: './add-proposal.component.css'
})
export class AddProposalComponent {
 
  Form: FormGroup | any;
  form: FormGroup | any;
  residentType!:any[];
  address!:any;
  ClientName!:any[];
  resident!:any;
  owneradd!:any;
  residenceId!:any;
  residentCode!:any[];
  selectedFile: File | null = null;
  yearNow!:any;
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private apiServices: ApiService,
    private _route: Router
    ) {

 
      this.buildForm();
    }
 
  ngOnInit(): void {
    //this.getResidentType();
    //this.getResidentCode();
    this.yearNow= new Date().getFullYear();
    console.log("year", this.yearNow)
    this.getClient();
  }
 

 
 /* getResidentType()
  {
    this.apiServices.getResidentType().subscribe((resp)=>{
      console.log("ResidenstType",resp);
     
      this.residentType = resp;
      console.log("Address",this.residentType);
     
    })
  }*/
 
    getClient()
    {
      this.apiServices.getClientsAll().subscribe((resp)=>{
        console.log("Client",resp);
       
        this.ClientName = resp;
        console.log("Nameclient",this.ClientName);
       
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
    this.apiServices.addProposal(this.form).subscribe((resp)=>{
      console.log("ProposalNew",resp);
     
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
    console.log('Estoy en Submit form:',this.form);
    console.log('Estoy datem:',this.yearNow);
      this.Form = this.fb.group({
        Name:[this.form.get('Name')!.value],
        Category:[ this.form.get('Category')!.value],
        ProjectDescription:[this.form.get('ProjectDescription')!.value],
        ContractValue:[this.form.get('ContractValue')!.value],
        EstimatedHours:[this.form.get('EstimatedHours')!.value],
        Year:[this.yearNow],
        Proposal:[this.form.get('Proposal')!.value],
        NoProposal:[this.form.get('NoProposal')!.value],
        Country:[this.form.get('Country')!.value],
        ProposalRequestDate:[this.form.get('ProposalRequestDate')!.value],
        ClientID: null,
        ProposalSubmitted:[this.form.get('ProposalSubmitted')!.value],
        Scope:[this.form.get('Scope')!.value],
        StatusProp:['Submitted']
     })
 
     console.log('Pase el formulario',this.Form);
   
      this.apiServices.addProposal(this.Form.value).subscribe((resp:any)=>{
        console.log('Formulario enviado a nuevo proposal:', resp);
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
    this._route.navigate(['/ListProposal']);
  }
 
 
 
  buildForm(){
    this.form = this.fb.group({
     
      Name: ['', Validators.required],
      Category: ['Proposal', Validators.required],
      ProjectDescription: ['', Validators.required],
      ContractValue: ['', Validators.required],
      EstimatedHours: ['', Validators.required],
      Year: [this.yearNow],
      Proposal:[''],
      NoProposal:['',Validators.required],
      Country:['USA',Validators.required],
      ProposalRequestDate:[''],
      ProposalSubmitted:[''],
      Scope:['',Validators.required],
      StatusProp:['Submitted']
    
 
    });

  
  }
 
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
    }
  }
 
}



