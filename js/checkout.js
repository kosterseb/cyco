const shopIcon = document.querySelector('.shop-icon');
const checkoutContainer = document.querySelector('.checkout-container');
const closeCart = document.querySelector('.close-cart');

// Toggle cart function
function toggleCart() {
    checkoutContainer.classList.toggle('open');
}

shopIcon.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);


//test