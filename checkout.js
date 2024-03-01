const SHIPPING_PRICE = 25.99
const FREE_SHIPPING_LIMIT = 3000
const TAX_RATE = 0.18

const deleteProducts = document.querySelector(".delete-div .fa-trash-can")
const products = document.querySelector(".products")

deleteProducts.addEventListener("click", ()=> {
    if (confirm("silmek istediğnize emin misiniz?")) {
        products.textContent = "No product"
        products.classList.add("no-product")
        document.querySelector(".delete-div").style.display = "none"
        calculateTotalPrice()
    }
    
})

products.addEventListener("click", (e)=>{
    if (e.target.classList.contains("fa-plus")) {
        // document.getElementById("quantity").innerText++
        e.target.previousElementSibling.innerText++
        calculateProductPrice(e.target)
    }else if(e.target.classList.contains("fa-minus")){
        if(e.target.nextElementSibling.innerText>1){
        e.target.nextElementSibling.innerText--
        calculateProductPrice(e.target)}
    }else if(e.target.classList.contains("fa-trash-can")){
        e.target.closest(".product").remove()
        if (products.innerHTML.trim()==="") {
            products.textContent = "No product"
            products.classList.add("no-product")
        }
        calculateTotalPrice()
    }
})
const calculateProductPrice = (btn) => {
    const discountedPrice = btn.closest(".product-info").querySelector("#discounted-price").textContent

    const quantity = btn.closest(".buttons-div").querySelector("#quantity").textContent

    let productPrice = btn.closest(".buttons-div").querySelector("#product-price")  

    productPrice.textContent = (discountedPrice * quantity).toFixed(2)
    calculateTotalPrice()
}

const calculateTotalPrice = () => {
    const productPrices = document.querySelectorAll("#product-price");
    const subtotal = [...productPrices].reduce((sum, price) => sum + Number(price.textContent), 0);

    const shippingPrice = subtotal > FREE_SHIPPING_LIMIT || subtotal === 0 ? 0 : SHIPPING_PRICE;

    const taxPrice = (subtotal * TAX_RATE);

    const totalPrice = (subtotal + shippingPrice + taxPrice).toFixed(2);

    document.getElementById("selected-price").textContent = subtotal.toFixed(2);
    document.getElementById("shipping").textContent = shippingPrice.toFixed(2);
    document.getElementById("tax").textContent = taxPrice.toFixed(2);
    document.getElementById("total").textContent = totalPrice;
}


window.addEventListener("load", ()=>{
    calculateTotalPrice()
})