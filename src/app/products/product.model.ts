export class Product{
    public productId: any;
    public name: string;
    public description: string;
    public price: number;
    public imagePath: string;

    constructor(productId: any, name: string, description: string, price: number, imagePath: string) {
        this.productId = productId,
        this.name = name,
        this.description = description,
        this.price = price;
        this.imagePath = imagePath;
    }
}