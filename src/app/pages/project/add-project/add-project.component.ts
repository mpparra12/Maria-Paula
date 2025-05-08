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
import { MatSelectChange } from '@angular/material/select';

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
  Market!:any[];
  ServiceLine!:any[];
  ProjectType!:any[];
  yearFP!:any[];
  defaultDate!: Date;
  fechaSend!:any;
  fechaDividida: string[] = [];
  FP!:any[];
  Employee!:any[];
  EmployeeManager!:any[];
  EmployeePM!:any[];  
  address!:any;
  resident!:any;
  owneradd!:any;
  residenceId!:any;
  residentCode!:any[];
  selectedFile: File | null = null;
  selectedValue!:any;
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
        this.getbyYear();
        this.buildForm();
    }
 
  ngOnInit(): void {
    this.getClient();
    
    this.getManager();
    this.getPM();

    this.getAllTypeServiceLine();
    this.getAllMarket();
    this.getAllTypeProject();
    //this.SelectFP(this.selectedValue);
  }
 

 
  getClient()
  {
    this.apiServices.getClientsAll().subscribe((resp)=>{
      console.log("Client",resp);
     
      this.ClientName = resp;
      console.log("Nameclient",this.ClientName);
     
    })
  }
 
  getbyYear()
  {
    this.apiServices.getbyYear().subscribe((resp)=>{
      console.log("Client",resp);
     
      this.yearFP = resp;
      this.selectedValue = this.yearFP[0];
      console.log("yearFP",this.yearFP);
      console.log("selectedValue",this.selectedValue);
      this.form.controls.yearFP.setValue(this.selectedValue);
      
      console.log("selectedValue",this.form.controls.yearFP);
    })
  }

 /* getFP()
  {
    this.apiServices.getAllNoProposal(this.selectedValue).subscribe((resp)=>{
      console.log("FP",resp);
     
      this.FP = resp;
      console.log("NamecFPlient",this.FP);
     
    })
  }
 */

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
 


  SelectFP(event:any):void{
    console.log('Selected value:', event.value);
    // debugger;
    // let idaddress=this.form.get('selectedOption')!.value;
   //  console.log("event",event);
     this.apiServices.getAllNoProposal(event.value).subscribe((resp:any)=>{
       console.log('Residnec Addr:', resp);
       this.FP = resp;
     })
  }

  
  getAllTypeStatusProject()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getAllTypeStatusProject().subscribe((resp)=>{
      console.log("getAllTypgetAllTypeStatusProjecteProject",resp);
     
      this.Employee = resp;
  
    })
  }


  getAllTypeProject()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getAllTypeProject().subscribe((resp)=>{
      console.log("getAllTypeProject",resp);
     
      this.ProjectType = resp;
  
    })
  }
  getAllTypeServiceLine()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getAllTypeServiceLine().subscribe((resp)=>{
      console.log("getAllTypeServiceLine",resp);
     
      this.ServiceLine = resp;
  
    })
  }

  getAllMarket()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getAllMarket().subscribe((resp)=>{
      console.log("getAllMarket",resp);
     
      this.Market = resp;
  
    })
  }

  getEmployee()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getEmployee().subscribe((resp)=>{
      console.log("getEmployee",resp);
     
      this.Employee = resp;
  
    })
  }
 
  getManager()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getManager().subscribe((resp)=>{
      console.log("getManager",resp);
     
      this.EmployeeManager = resp;
  
    })
  }

  getPM()
  {
   // console.log("getEmployee",this.residenceId);
    this.apiServices.getPM().subscribe((resp)=>{
      console.log("getManager",resp);
     
      this.EmployeePM = resp;
  
    })
  }


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
    this._route.navigate(['/ListProjects']);
  }
 
  InfoFPSelect(event: MatSelectChange):void{
    // alert("estoy aqui");
     console.log('Selected value:', event.value);
    // debugger;
    // let idaddress=this.form.get('selectedOption')!.value;
     //console.log("add",idaddress);
     this.apiServices.getFPbyNum(event.value).subscribe((resp:any)=>{
       console.log('fecha Addr:', resp.ProposalRequestDate);
       this.fechaDividida = resp.ProposalRequestDate.split('-');
       this.fechaSend= this.fechaDividida[1] +"/" + this.fechaDividida[2]+"/" + this.fechaDividida[0];
       this.defaultDate= this.fechaSend;
       console.log('defaultDate:', this.defaultDate);
       //console.log(this.fechaDividida,this.fechaSend)
        this.form = this.fb.group({
          
          ProjectName:[resp.ProjectDescription],
          ProjectScope:[resp.ProjectDescription],
         // defaultDate: this.fechaSend,
         // FPRequestedDate :[this.defaultDate],
          //[resp.ProposalRequestDate,Validators.required], 5/7/2025, 2025-01-13
          //FPSenttoClien:[this.defaultDate],
          ProjectFee:[resp.ContractValue]
        })
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
      selectedEmployee: [''],
      
      AgreementNo: ['', Validators.required],
      ClientProject: ['', Validators.required],
      GeneralDescription: ['', Validators.required],
      ClientProjectCost: ['', Validators.required],
      selectedFP: [''], 
      ProjectCSJ: [''],
      State:[''],
      County:['',Validators.required],
      City:[''],
      HighwayNo:[''],
      Owner:[''],
      Segment: [''],
      Bridge :[''],
      Contact :['',Validators.required],
      yearFP:[''],
      FP:[''],
      ProjectName:[''],
      ProjectScope:[''],
      DepartmentManager:[''],
      ProjectManager: [''],
      Task :[''],
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


