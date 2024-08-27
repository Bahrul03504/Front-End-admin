import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/service/users.service';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent implements OnInit {

  @Input() user: User = {} as User;

  formData: User = {
    id: 0,
    name: '',
    email: '',
    role: 'Customer',
    phone: '',
    address: ''
  };

  roles: string[] = ['Admin', 'Customer', 'Seller'];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if (this.user) {
      this.formData = { ...this.user };
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.formData.name && this.formData.email) {
      this.modalCtrl.dismiss(this.formData);
    }
  }

}
