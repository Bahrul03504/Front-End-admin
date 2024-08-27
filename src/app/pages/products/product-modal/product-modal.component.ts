import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product, ProductService } from 'src/app/service/product.service';
import { CategoryService, Category } from 'src/app/service/categories.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {

  @Input() product: Product = {} as Product;

  categories: Category[] = [];

  formData: Product = {
    id: 0,
    name: '',
    category: '',
    price: 0,
    description: '',
    imageUrl: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categories = this.categoryService.getCategories();
    if (this.product) {
      this.formData = { ...this.product };
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.formData.name && this.formData.category && this.formData.price) {
      this.modalCtrl.dismiss(this.formData);
    }
  }

}
