import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CategoryService, Category, SubCategory } from '../../service/categories.service';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { SubCategoryModalComponent } from './sub-category-modal/sub-category-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  categories: Category[] = [];
  selectedCategory?: Category;

  constructor(
    private categoryService: CategoryService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categories = this.categoryService.getCategories();
  }

  async addCategory() {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.categoryService.addCategory(data);
      this.categories.push(data); // Tambahkan data langsung ke daftar categories
    }
  }

  async editCategory(category: Category) {
    const modal = await this.modalCtrl.create({
      component: CategoryModalComponent,
      componentProps: { category }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.categoryService.updateCategory(data);
      const index = this.categories.findIndex(c => c.id === data.id);
      if (index > -1) {
        this.categories[index] = data; // Perbarui kategori di daftar categories
      }
      if (this.selectedCategory?.id === data.id) {
        this.selectedCategory = data; // Perbarui selectedCategory jika yang diedit adalah kategori yang dipilih
      }
    }
  }

  async deleteCategory(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus kategori ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.categoryService.deleteCategory(id);
            this.categories = this.categories.filter(c => c.id !== id);
            if (this.selectedCategory?.id === id) {
              this.selectedCategory = undefined; // Hapus selectedCategory jika kategori yang dihapus adalah yang dipilih
            }
          }
        }
      ]
    });

    await alert.present();
  }

  selectCategory(category: Category) {
    this.selectedCategory = category;
  }

  async addSubCategory() {
    const modal = await this.modalCtrl.create({
      component: SubCategoryModalComponent,
      componentProps: { parentCategoryId: this.selectedCategory?.id }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && this.selectedCategory) {
      this.categoryService.addSubCategory(this.selectedCategory.id, data);
      this.selectedCategory.subCategories.push(data); // Tambahkan subkategori ke kategori yang dipilih
    }
  }

  async editSubCategory(subCategory: SubCategory) {
    const modal = await this.modalCtrl.create({
      component: SubCategoryModalComponent,
      componentProps: { subCategory }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data && this.selectedCategory) {
      this.categoryService.updateSubCategory(this.selectedCategory.id, data);
      const index = this.selectedCategory.subCategories.findIndex(sc => sc.id === data.id);
      if (index > -1) {
        this.selectedCategory.subCategories[index] = data; // Perbarui subkategori di daftar subkategori
      }
    }
  }

  async deleteSubCategory(subCategoryId: number) {
    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus subkategori ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            if (this.selectedCategory) {
              this.categoryService.deleteSubCategory(this.selectedCategory.id, subCategoryId);
              this.selectedCategory.subCategories = this.selectedCategory.subCategories.filter(sc => sc.id !== subCategoryId);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
