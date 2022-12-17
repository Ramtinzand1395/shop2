import React , {createContext, useEffect, useState} from "react"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const cardcontext = createContext()
const {Provider} = cardcontext

const CardProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [count , setCount] = useState(1);
    useEffect(()=>{
        const dataCart = JSON.parse(localStorage.getItem("store"))
        if(dataCart) setCart(dataCart)
    },[])

    useEffect(()=> {
        localStorage.setItem("store", JSON.stringify(cart))
    },[cart])

    useEffect(()=>{
        const putData = ()=>{
            localStorage.setItem("store" , JSON.stringify(cart))
        }
       putData();

    },[cart])
    const Addtocart = (data)=>{
        const check = cart.every(item => {
            return item._id !== data._id
        });
        if(check){
            setCart([...cart , data])
        }else{
            alert("شما این محصول را در سبد خرید دارید.")
        }
    };

    const increase = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                setCount(count + 1);
            }
            if(item.qty <= count){
                setCount(count )
                alert(` تعداد محصول موجود در انبار ${item.qty} است. `)
            }
        })

        setCart([...cart])
    }
    const decrease = (id) => {
        cart.forEach(item => {
            if(item._id === id){
                console.log(item._id)
                count === 1 ? setCount(1) : setCount(count - 1);
            }
        })

        setCart([...cart])
    }
    const removeProduct = (id) => {
        if(confirm("آیا از حذف محصول مطمئنید؟")){
            cart.forEach((item,index) => {
                if(item._id === id){
                    cart.splice(index,1)
                }
            })
            setCart([...cart])
        }
    }

    return(
        <Provider
        value={{
        cart: [cart, setCart],
        count:[count , setCount],
        Addtocart,
        increase,
        decrease,
        removeProduct,
    }}
        >
        {children}
        </Provider>
    )

}

export {
    cardcontext,
CardProvider
}