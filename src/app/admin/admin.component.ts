import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../products/product.service';
import { LoginService } from '../auth/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.less'
})
export class AdminComponent {

  // id: number;
  // editMode = false;
  password: string = '';
  email: string = '';
  productForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
    this.initForm();
  }
  

  onSubmit() {
    this.productService.addProduct(this.productForm.value);
    this.router.navigate(['']);
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

  toProducts(){
    this.router.navigate(['/admin/products']);
  }
  
}
