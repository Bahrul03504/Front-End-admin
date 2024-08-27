import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ProductService, Product } from '../../service/product.service';
import { ProductModalComponent } from './product-modal/product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  ionViewWillEnter() {
    this.loadProducts();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  async addProduct() {
    const modal = await this.modalCtrl.create({
      component: ProductModalComponent
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.productService.addProduct(data);
      this.loadProducts();
    }
  }

  async editProduct(product: Product) {
    const modal = await this.modalCtrl.create({
      component: ProductModalComponent,
      componentProps: { product }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.productService.updateProduct(data);
      this.loadProducts();
    }
  }

  async deleteProduct(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus produk ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.productService.deleteProduct(id);
            this.loadProducts();
          }
        }
      ]
    });

    await alert.present();
  }

}
