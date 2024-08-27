import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubCategory } from '../../../service/categories.service';

@Component({
  selector: 'app-sub-category-modal',
  templateUrl: './sub-category-modal.component.html',
  styleUrls: ['./sub-category-modal.component.scss'],
})
export class SubCategoryModalComponent implements OnInit {
  @Input() subCategory!: SubCategory;
  @Input() parentCategoryId!: number;

  formData: SubCategory = {
    id: 0,
    name: '',
    parentCategoryId: 0
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.subCategory) {
      this.formData = { ...this.subCategory };
    } else {
      this.formData.parentCategoryId = this.parentCategoryId;
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
