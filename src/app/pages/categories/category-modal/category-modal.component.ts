import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Category } from '../../../service/categories.service';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss'],
})
export class CategoryModalComponent implements OnInit {
  @Input() category!: Category;

  formData: Category = {
    id: 0,
    name: '',
    subCategories: []
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.category) {
      this.formData = { ...this.category };
    }
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  save() {
    if (this.formData.name) {
      this.modalCtrl.dismiss(this.formData);
    }
  }
}
