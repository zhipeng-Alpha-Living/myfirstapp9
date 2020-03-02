import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    public productSubscription: Subscription[] = [];
    public details:any;

  constructor( 
    private route: ActivatedRoute,
    private cartService: CartService,
    public productService: ProductService,
    public authService: AuthService,
  ) { 
    this.productService.selectedProduct.subscribe(dtl => {
      this.details = dtl;
      })
  }

  ngOnInit() {
    this.productSubscription.push(
      this.route.paramMap.subscribe(params => {
          const productId = params.get('productId');
          this.productService.selectProduct.next(productId);
      }))

  }

  addToCart(product){
    this.cartService.addToCart(this.details);

    window.alert('Your product has been added to the cart!');
  }

    //ngOnDestroy() {
    //this.productSubscription.forEach( sub => sub.unsubscribe());
    //}

}
