import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { OrderService, Order } from '../../service/orders.service';
import { OrderDetailModalComponent } from './order-detail-modal/order-detail-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  ionViewWillEnter() {
    this.loadOrders();
  }

  loadOrders() {
    this.orders = this.orderService.getOrders();
  }

  async viewOrder(order: Order) {
    const modal = await this.modalCtrl.create({
      component: OrderDetailModalComponent,
      componentProps: { order }
    });
    await modal.present();
  }

  async deleteOrder(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus pesanan ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.orderService.deleteOrder(id);
            this.loadOrders();
          }
        }
      ]
    });

    await alert.present();
  }
}
