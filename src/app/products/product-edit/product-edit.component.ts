import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.less'
})
export class ProductEditComponent {

  // id: number;
  // editMode = false;
  productForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
  }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    this.productService.addProduct(this.productForm.value);
    this.onCancel();
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let productName = '';
    let productImage = '';
    let productDescription = '';
    let productPrice = '';
  
    this.productForm = new FormGroup({
      'name': new FormControl(productName, Validators.required),
      'description': new FormControl(productDescription, Validators.required),
      'price': new FormControl(productPrice, Validators.required),
      'imagePath': new FormControl(productImage, Validators.required)
       });
  }
}
