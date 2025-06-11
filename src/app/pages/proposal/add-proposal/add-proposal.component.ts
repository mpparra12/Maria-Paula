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
import { FormControl } from '@angular/forms';
import moment from 'moment';

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
  formLast: FormGroup | any;
  residentType!:any[];
  address!:any;
  ClientName!:any[];
  ClientSelect!:any;
  IDCliSelect!:any;
  ClientID!:any[];
  resident!:any;
  owneradd!:any;
  residenceId!:any;
  residentCode!:any[];
  selectedFile: File | null = null;
  yearNow!:any;
  Last2year!:any;
  NewProposal!:any;
  COuntNewProposalName!:any;
  NewProposalName!:any;
  LastProject!:any;
  LastName!:any;
   dateControl = new FormControl();
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private apiServices: ApiService,
    private _route: Router
    ) {

     this.yearNow= new Date().getFullYear();
      this.getLastProposalNum();
    console.log("year", this.yearNow)
    this.getClient();
      this.buildForm();
    }
 
  ngOnInit(): void {
    //this.getResidentType();
    //this.getResidentCode();
    console.log('NewProposalName',this.NewProposalName);
 


  }
 getFormattedDateForSQL(): string | null {
    const selectedDate = this.dateControl.value;
    if (selectedDate) {
      // Format date to 'YYYY-MM-DD' for SQL Server
      return moment(selectedDate).format('YYYY-MM-DD');
    }
    return null;
  }
  getLastProposalNum()
  {
    this.apiServices.getLastProposalNum('U').subscribe((resp)=>{
      console.log("lastProposal",resp);
      this.LastProject = parseInt(resp.NoProject);
      this.LastName =resp.Name;
      console.log("LastName",this.LastName);     
      console.log("LastProject",this.LastProject);         
     this.Last2year = String(this.yearNow);
      this.NewProposal = parseInt(resp.NoProposal)+1;
      this.COuntNewProposalName=String(this.NewProposal);
      console.log("NewProposal",this.NewProposal);
      if (this.COuntNewProposalName.length===1)
      {
          this.NewProposalName = this.Last2year.slice(-2) +'-00'+String(this.NewProposal)
      }
      if (this.COuntNewProposalName.length===2)
      {
          this.NewProposalName = this.Last2year.slice(-2) +'-0'+String(this.NewProposal)
      }      
            if (this.COuntNewProposalName.length===3)
      {
          this.NewProposalName = this.Last2year.slice(-2) +'-'+String(this.NewProposal)
      }
      console.log("COuntNewProposalName",this.NewProposalName);
     this.buildForm();
    })
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
        this.ClientID =resp;
        console.log("ClientID",this.ClientID);
       
      })
    }

        SelectClient(event:any):void{
    
      this.apiServices.getTransactionById(event.value).subscribe((resp)=>{
        console.log("Client",resp);
       
        this.ClientSelect = resp.Name;

        this.IDCliSelect = parseInt(resp.ID);
        console.log("ClientID",this.ClientID);
       
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
 
 udpdateLastProposal()

  {    this.formLast = this.fb.group({
            ID: [1], 
            NoProposal: [this.NewProposal],
            NoProject: [this.LastProject]
             });

      console.log('Pase el formulario',this.formLast);
       this.apiServices.updatelastProposal(this.formLast.value).subscribe((resp1:any)=>{
              console.log('resultado de Update',resp1);
               if (resp1) {
                  alert("Proposal ADD");
            }
          });

    
    }
   
  AddClient():void{
   
    this._route.navigate(['/AddClient']);
 
  }

  onSubmit() {
    //debugger;
    console.log('Estoy en Submit form:',this.form);
    console.log('Estoy datem:',this.yearNow);
      this.Form = this.fb.group({
        ClientName:[this.ClientSelect],
        Category:[ this.form.get('Category')!.value],
        ProjectDescription:[this.form.get('ProjectDescription')!.value],
        ContractValue:[(this.form.get('ContractValue')!.value)],
        Estimated_h:[parseInt(this.form.get('EstimatedHours')!.value)],
        Year:[this.yearNow],
        Proposal:[this.NewProposal],
        NoProposal:[this.form.get('NoProposal')!.value],
        Country:[this.form.get('Country')!.value],
        ProposalRequestDate:[this.getFormattedDateForSQL()],
        IDClient: [this.IDCliSelect],
        ProposalSubmitted:[this.getFormattedDateForSQL()],
        Scope:[this.form.get('Scope')!.value],
        StatusProp:['Submitted']
     })
 
     console.log('Pase el formulario',this.Form);
   
      this.apiServices.addProposal(this.Form.value).subscribe((resp:any)=>{
        console.log('Formulario enviado a nuevo proposal:', resp);
         if (resp) {
          this.udpdateLastProposal();
                     
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
console.log('NewProposalName',this.NewProposalName);
    this.form = this.fb.group({
     
      Name: ['', Validators.required],
      Category: ['Proposal', Validators.required],
      ProjectDescription: ['', Validators.required],
      ContractValue: [],
      EstimatedHours: [],
      Year: [this.yearNow],
      Proposal:[this.NewProposal],
      NoProposal:[this.NewProposalName],
      Country:['USA',Validators.required],
      ProposalRequestDate:[new Date()],
      ProposalSubmitted:[new Date()],
      Scope:['',Validators.required],
      IDClient:[],
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



