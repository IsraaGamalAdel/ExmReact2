import { createContext, useEffect, useState } from "react";
import axios from "axios"; 


export let CartContext = createContext();
let userToken = localStorage.getItem('userToken');

let headers = {
    token:userToken
}
function addToCart(ProductId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
        productId:ProductId 
    },
    {
        headers:headers
    }).then((response)=>response)
    .catch((error)=> error);
}

function getLoggedUserCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {
        headers:headers
    }).then((response)=>response)
    .catch((err)=> err);
}

function removeCartItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {
        headers:headers
    }).then((response)=>response)
    .catch((errr)=> errr);
}

function updateProductQuantity(productId , count){
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , 
    {count} , {headers:headers})
        .then((response)=>response)
        .catch((errror)=> errror);
}

function clearUserCart(){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {
        headers:headers})
        .then((response)=>response)
        .catch((errrorr)=> errrorr);
}

function addToWishList(ProductId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    {
        productId:ProductId 
    },
    {
        headers:headers
    }).then((response)=>response)
    .catch((error)=> error);
}

function getLoggedUserWishList(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` , {
        headers:headers
    }).then((response)=>response)
    .catch((err)=> err);
}

function removeWishListItem(productId){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` , {
        headers
    }).then((response)=>response)
    .catch((errr)=> errr);
}

function onLinePayment(cartId , url , values){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    {
        shippingAddress: values
    },
    {
        headers:headers
    }).then((response)=>response)
    .catch((error)=> error);
}

function getUserOrders(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}` , {
        headers:headers
    }).then((response)=>response)
    .catch((err)=> err);
}


export default function CartContextProvider(props){
    const [cartId, setCartId] = useState(null);
    // const [cartUrl, setCartUrl] = useState(null);


    async function getCart(){
        let {data} = await getLoggedUserCart();
        setCartId(data?.data._id);
        // setCartUrl(data?.data.cancel_url)
    }
    useEffect(()=>{
        getCart();
    } , []);

    // async function addToCart(Product){
    //     let Product = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
    //     {
    //         ProductId:Product 
    //     },
    //     {
    //         headers:headers
    //     });
    // }

    return <CartContext.Provider value={{getUserOrders, cartId , addToCart , getLoggedUserCart , removeCartItem , updateProductQuantity , clearUserCart , addToWishList , getLoggedUserWishList , removeWishListItem , onLinePayment}}>
            {props.children}
    </CartContext.Provider>
}