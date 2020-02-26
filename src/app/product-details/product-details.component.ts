import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
    public productSubscription: Subscription[] = [];
    public details:any;

  constructor( 
    private route: ActivatedRoute,
    private cartService: CartService,
    public productService: ProductService,
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
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

    //ngOnDestroy() {
    //this.productSubscription.forEach( sub => sub.unsubscribe());
    //}

}
