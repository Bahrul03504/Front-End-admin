import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Order } from 'src/app/service/orders.service';

@Component({
  selector: 'app-order-detail-modal',
  templateUrl: './order-detail-modal.component.html',
  styleUrls: ['./order-detail-modal.component.scss'],
})
export class OrderDetailModalComponent implements OnInit {

  @Input() order: Order = {} as Order;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
