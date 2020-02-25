export class Product {
  createdAt: Date;
  description: string;
  imageUrl: string;
  price: string;
  productName: string;

    constructor({createdAt, description, imageUrl, price, productName}){
      this.createdAt = createdAt;
      this.description = description;
      this.imageUrl = imageUrl;
      this.price = price;
      this.productName = productName;
    }
}