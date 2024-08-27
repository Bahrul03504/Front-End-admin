import { Injectable } from '@angular/core';

export interface SubCategory {
  id: number;
  name: string;
  parentCategoryId: number;
}

export interface Category {
  id: number;
  name: string;
  subCategories: SubCategory[];
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    {
      id: 1,
      name: 'Elektronik',
      subCategories: [
        { id: 1, name: 'Smartphone', parentCategoryId: 1 },
        { id: 2, name: 'Laptop', parentCategoryId: 1 }
      ]
    },
    {
      id: 2,
      name: 'Fashion',
      subCategories: [
        { id: 3, name: 'Pakaian Pria', parentCategoryId: 2 },
        { id: 4, name: 'Pakaian Wanita', parentCategoryId: 2 }
      ]
    }
  ];

  constructor() {}

  getCategories(): Category[] {
    return this.categories;
  }

  getCategory(id: number): Category | undefined {
    return this.categories.find(c => c.id === id);
  }

  addCategory(category: Category) {
    category.id = this.generateCategoryId();
    this.categories.push(category);
  }

  updateCategory(category: Category) {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index > -1) {
      this.categories[index] = category;
    }
  }

  deleteCategory(id: number) {
    this.categories = this.categories.filter(c => c.id !== id);
  }

  addSubCategory(categoryId: number, subCategory: SubCategory) {
    const category = this.getCategory(categoryId);
    if (category) {
      subCategory.id = this.generateSubCategoryId();
      category.subCategories.push(subCategory);
    }
  }

  updateSubCategory(categoryId: number, subCategory: SubCategory) {
    const category = this.getCategory(categoryId);
    if (category) {
      const index = category.subCategories.findIndex(sc => sc.id === subCategory.id);
      if (index > -1) {
        category.subCategories[index] = subCategory;
      }
    }
  }

  deleteSubCategory(categoryId: number, subCategoryId: number) {
    const category = this.getCategory(categoryId);
    if (category) {
      category.subCategories = category.subCategories.filter(sc => sc.id !== subCategoryId);
    }
  }

  private generateCategoryId(): number {
    return this.categories.length > 0 
      ? Math.max(...this.categories.map(c => c.id)) + 1 
      : 1;
  }

  private generateSubCategoryId(): number {
    const allSubCategories = this.categories
      .map((c: Category) => c.subCategories)
      .reduce((acc, val) => acc.concat(val), []);

    return allSubCategories.length > 0
      ? Math.max(...allSubCategories.map((sc: SubCategory) => sc.id)) + 1
      : 1;
  }
}
