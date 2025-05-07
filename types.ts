//definition of product
interface Product{
    readonly id :number;
    name:string;
    price:string;
    quantity:number;
}
//
function getProduct<Pro>(p:Pro): Pro {
return p;
}
//create product
const product1 :Product = {
    id:1,
    name:"phone",
    price:"1000",
    quantity: 3
};
//call function product
const getPro = getProduct<Product>(product1);
console.log(getPro);
