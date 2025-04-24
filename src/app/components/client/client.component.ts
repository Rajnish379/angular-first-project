import { Component,inject,OnInit } from '@angular/core';
import { Client } from '../../model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../model/interface/role';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from "../reusableComponent/alert/alert.component";
import { MyButtonComponent } from "../reusableComponent/my-button/my-button.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe, JsonPipe, AsyncPipe, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  clientObj: Client = new Client();
  clientList: Client[] = [];
  currentDate: Date = new Date();

  clientService = inject(ClientService);

  userList$: Observable<any> = new Observable<any>;


  ngOnInit(): void {
   this.loadClient();
   this.userList$ = this.clientService.getAllUser();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res:APIResponseModel) => {
      this.clientList = res.data;
    })
  }

  onSaveClient(data: string) {
    this.clientService.addUpdate(this.clientObj).subscribe((res:APIResponseModel)=> {
      if(res.result) {
        alert("Client successfully created")
        this.loadClient();
      } else {
        alert(res.message)
      }
    })

  }

  onDelete(id: number) {
    const isDelete = confirm("Are you sure you want to delete?");
    if (isDelete) {
    this.clientService.deleteClientById(id).subscribe((res:APIResponseModel)=> {
      if(res.result) {
        alert("Client Delete Success")
        this.loadClient();
      } else {
        alert(res.message)
      }
    })
  }


  }

  onEdit(data: Client) {
    this.clientObj = data;
  }
}
