import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Cart } from '../interfaces/cart';
import { Product } from '../classes/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    private productSubscription: Subscription[] = [];
    public details:any;
    private cartItemArray: Cart[] = [];
    private response: any;

  constructor( 
    private route: ActivatedRoute,
    private cartService: CartService,
    public productService: ProductService,
    public authService: AuthService,
  ) { 
    this.productService.selectedProduct.subscribe(dtl => {
      this.details = dtl;
      })

    this.cartService.cartItems.subscribe(tempItem => { this.response = tempItem;
      this.response.forEach(element => {
        this.cartItemArray.push({
          cartQuantity: element.cartQuantity,
          createdAt: element.createdAt,
          imageUrl: element.imageUrl,
          productId: element.productId,
          productName: element.productName,
          productPrice: element.productPrice,
        })
      })
    })
    
    
  }

  ngOnInit(){
    this.productSubscription.push(
      this.route.paramMap.subscribe(params => {
          const productId = params.get('productId');
          this.productService.selectProduct.next(productId);
        }
      )
    )
  }

  
  public addToCart(product){

    for(let i = 0; i < this.cartItemArray.length; i++){
      if(this.details.productId === this.cartItemArray[i].productId){
        this.cartItemArray[i].cartQuantity ++
        this.cartService.addQuantity(this.cartItemArray[i].cartQuantity, this.cartItemArray[i].productId)
        break;
      }else if(i === this.cartItemArray.length-1){
        this.cartService.addToCart(this.details)
      
      }
    }
    
    window.alert('Your product has been added to the cart!');
  }

  
  ngOnDestroy() {
  this.productSubscription.forEach( sub => sub.unsubscribe());
  }

}
