import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UsersPageRoutingModule } from './users-routing.module';
import { UsersPage } from './users.page';
import { UserModalComponent } from './user-modal/user-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsersPageRoutingModule
  ],
  declarations: [
    UsersPage,
    UserModalComponent
  ],
})
export class UsersPageModule {}
