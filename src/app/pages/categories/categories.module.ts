import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';
import { CategoriesPage } from './categories.page';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { SubCategoryModalComponent } from './sub-category-modal/sub-category-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule
  ],
  declarations: [
    CategoriesPage,
    CategoryModalComponent,
    SubCategoryModalComponent
  ]
})
export class CategoriesPageModule {}
