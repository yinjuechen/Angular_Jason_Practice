import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../shared/services/product.service';
import {CategoryService} from '../../shared/services/category.service';
import {YearsService} from '../../shared/services/years.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProductFormGroup: FormGroup;
  categories;
  years;

  constructor(private ps: ProductService,
              private fb: FormBuilder,
              private router: Router,
              private cs: CategoryService,
              private ys: YearsService) {
  }

  ngOnInit() {
    // get category
    if (!this.cs.categories) {
      this.cs.getAllCategory().subscribe((value) => {
        this.categories = value;
        this.cs.categories = value;
      });
    } else {
      this.categories = this.cs.categories;
    }

    // Initialize addProduct form
    this.addProductFormGroup = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      image: ['']
    });

    // Initialize years
    this.years = this.ys.years;

    // Initialize categories
    if (!this.cs.categories) {
      this.cs.getAllCategory().subscribe((value) => {
        this.categories = value;
        this.cs.categories = value;
      });
    } else {
      this.categories = this.cs.categories;
    }
  }

  addProduct() {
    const truck = {
      brand: this.addProductFormGroup.value.brand,
      model: this.addProductFormGroup.value.model,
      year: this.addProductFormGroup.value.year,
      category: this.categories[this.addProductFormGroup.value.category - 1],
      stock: this.addProductFormGroup.value.stock,
      image: this.addProductFormGroup.value.image
    };
    console.log(truck);
    this.ps.AddProduct(truck).subscribe((value) => {
      if (value.success) {
        this.router.navigate(['/products']);
      }
    });
  }
}
