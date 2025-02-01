import { Product } from "../types/Products";

export const addTOcart=(product :Product)=>{
    const cart:Product[]=JSON.parse(localStorage.getItem('cart')||'[]')

    const existingProductIndex = cart.findIndex(item => item._id === product._id)

    if(existingProductIndex > -1) {cart [existingProductIndex].stock += 1}
    else{cart.push({...product, stock:1})}
    localStorage.setItem('cart',JSON.stringify(cart))
}

export const removeItems=(productID:string)=>{ 
    let cart:Product[]=JSON.parse(localStorage.getItem('cart')||'[]')
    cart=cart.filter(item => item._id != productID)

    localStorage.setItem('cart',JSON.stringify(cart))
}

export const addMoreQuantity=(productID:string , quantity:number)=>{ 
    let cart:Product[]=JSON.parse(localStorage.getItem('cart')||'[]')
    const productIndex=cart.findIndex(item => item._id === productID)
    if(productIndex> -1){ cart[productIndex].stock=quantity 
        localStorage.setItem('cart', JSON.stringify(cart))

    }

}


export const getcartItems=(): Product[] =>{ 
    return JSON.parse(localStorage.getItem('cart')||'[]')
}
