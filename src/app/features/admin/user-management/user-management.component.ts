import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  id:number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit{

  users: User[] = [
    { id: 1, name: 'Ousmane Fall', email: 'ousmane@example.com', role: 'Éditeur', permissions: ['CREATE_SHARE', 'UPDATE_SHARE', 'VIEW_SHARE'] },
    { id: 2, name: 'Fatou Ka', email: 'fatou@example.com', role: 'Approbateur', permissions: ['APPROVE_SHARE', 'VIEW_SHARE'] },
    { id: 3, name: 'Issa Diallo', email: 'issa@example.com', role: 'Examineur', permissions: ['VIEW_SHARE', 'EXAMINE_SHARE'] },
    { id: 4, name: 'Awa Ndiaye', email: 'awa@example.com', role: 'Actionnaire', permissions: ['VIEW_SHARE'] }
  ];

  selectedUser?: User;

  selectUser(user:User):void{
    this.selectedUser = user;
  }

  updatePermissions(user:User,permission:string):void{
    const index = user.permissions.indexOf(permission);
    if(index > -1){
      user.permissions.splice(index, 1);
    } else {
      user.permissions.push(permission);
    }
  }

  savePermissions():void{
    console.log('====================================');
    console.log('Persmissions sauvegardées pour',this.selectedUser);
    console.log('====================================');
  }

  ngOnInit(): void {
  }
}
