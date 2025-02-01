export interface Product{ 
    _id:string;
    name:string;
    type:"product";
    imageUrl:string;
    slug:string;
    price:number;
    description:string;
    category:string;
    discountPercent:number;
    new:boolean;
    colors:[];
    sizes:[];
    stock:number;
    mainHeading:string
}