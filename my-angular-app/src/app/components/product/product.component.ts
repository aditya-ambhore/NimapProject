import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productName: string = '';
  categoryId: number = 0;
  products: any[] = [];
  categories: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.http.get('/api/categories').subscribe((data: any) => {
      this.categories = data;
    });
  }

  loadProducts() {
    this.http.get('/api/products').subscribe((data: any) => {
      this.products = data;
    });
  }

  onSubmit() {
    this.http
      .post('/api/products', { name: this.productName, categoryId: this.categoryId })
      .subscribe(() => {
        this.loadProducts();
        this.productName = '';
        this.categoryId = 0;
      });
  }

  editProduct(product: any) {
    const updatedName = prompt('Edit Product Name:', product.name);
    if (updatedName) {
      this.http
        .put(`/api/products/${product.id}`, { name: updatedName, categoryId: product.categoryId })
        .subscribe(() => this.loadProducts());
    }
  }

  deleteProduct(id: number) {
    this.http.delete(`/api/products/${id}`).subscribe(() => this.loadProducts());
  }
}
