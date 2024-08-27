import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { UserService, User } from '../../service/users.service';
import { UserModalComponent } from './user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[] = [];

  constructor(
    private userService: UserService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  ionViewWillEnter() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.userService.getUsers();
  }

  async addUser() {
    const modal = await this.modalCtrl.create({
      component: UserModalComponent
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.userService.addUser(data);
      this.loadUsers();
    }
  }

  async editUser(user: User) {
    const modal = await this.modalCtrl.create({
      component: UserModalComponent,
      componentProps: { user }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.userService.updateUser(data);
      this.loadUsers();
    }
  }

  async deleteUser(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus pengguna ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.userService.deleteUser(id);
            this.loadUsers();
          }
        }
      ]
    });

    await alert.present();
  }

}
