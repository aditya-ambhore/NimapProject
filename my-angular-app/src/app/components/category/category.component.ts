import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get('/api/categories').subscribe((data: any) => {
      this.categories = data;
    });
  }

  onSubmit() {
    this.http.post('/api/categories', { name: this.categoryName }).subscribe(() => {
      this.loadCategories();
      this.categoryName = '';
    });
  }

  editCategory(category: any) {
    const updatedName = prompt('Edit Category Name:', category.name);
    if (updatedName) {
      this.http
        .put(`/api/categories/${category.id}`, { name: updatedName })
        .subscribe(() => this.loadCategories());
    }
  }

  deleteCategory(id: number) {
    this.http.delete(`/api/categories/${id}`).subscribe(() => this.loadCategories());
  }
}
