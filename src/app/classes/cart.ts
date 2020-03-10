export class Cart {
  cartQuantity: number;
  createdAt: Date;
  imageUrl: string;
  productId: string;
  productName: string;
  productPrice: number;

  constructer({cartQuantity, createdAt, imageUrl, productId, productName, productPrice}){
    this.cartQuantity = cartQuantity;
    this.createdAt = createdAt;
    this.imageUrl = imageUrl;
    this.productId = productId;
    this.productName = productName;
    this.productPrice = productPrice;
  }
  
}