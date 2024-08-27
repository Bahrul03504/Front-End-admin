import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-product-modal',
  templateUrl: './add-edit-product-modal.component.html',
  styleUrls: ['./add-edit-product-modal.component.scss'],
})
export class AddEditProductModalComponent implements OnInit {
  @Input() isEditMode: boolean = false; // Inisialisasi dengan nilai default
  @Input() product: any; // Produk yang sedang diedit, jika dalam mode edit
  @Input() categories: any[] = []; // Daftar kategori yang tersedia
  @Input() subCategories: any[] = []; // Daftar sub-kategori yang tersedia

  productForm: FormGroup; // Form untuk produk

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder
  ) {
    // Inisialisasi FormGroup
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      sub_category_id: [''], // Menyimpan sub-kategori jika ada
      image: [''] // Menyimpan file gambar
    });
  }

  ngOnInit() {
    if (this.isEditMode && this.product) {
      this.productForm.patchValue(this.product); // Mengisi form dengan data produk jika dalam mode edit
    }
  }

  saveProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();

      Object.keys(this.productForm.controls).forEach((key) => {
        formData.append(key, this.productForm.get(key)?.value);
      });

      if (this.isEditMode) {
        formData.append('_method', 'PUT'); // Laravel perlu metode ini untuk mengupdate menggunakan FormData
      }

      this.modalController.dismiss({
        product: formData,
        reload: true
      });
    }
  }

  closeModal() {
    this.modalController.dismiss({
      reload: false
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({
        image: file
      });
    }
  }
}
