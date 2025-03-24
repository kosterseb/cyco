const shopIcon = document.querySelector('.shop-icon');
const checkoutContainer = document.querySelector('.checkout-container');
const closeCart = document.querySelector('.close-cart');

// Toggle cart function
function toggleCart() {
    checkoutContainer.classList.toggle('open');
}

shopIcon.addEventListener('click', toggleCart);
closeCart.addEventListener('click', toggleCart);

// Cart functionality
let products = null;
let listCart = [];

// get data from file json
fetch('/JSON/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
    })
    .catch(error => console.error('Error loading products:', error));

function addDataToHTML() {
    const cart = document.querySelector('.cart');
    products.categories.forEach(category => {
        category.products.forEach(product => {
            cart.innerHTML += `
                <div class="product">
                    <h1>${category.name}</h1>
                    <h2>${product.title}</h2>
                    <img src="${product.image}" alt="${product.title}">
                    <p>${product.description}</p>
                    <p>${(product.price * 1.25).toFixed(2)} kr</p>
                    <button onclick="addCart('${product.id}')">Add To Cart</button>
                </div>
            `;
        });
    });
}

function addCart(productId) {
    // Find the product in the nested structure
    let productToAdd = null;
    
    for (const category of products.categories) {
        const foundProduct = category.products.find(p => p.id === productId);
        if (foundProduct) {
            productToAdd = foundProduct;
            break;
        }
    }

    if (!productToAdd) return;

    // Check if product already exists in cart
    const existingProduct = listCart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        listCart.push({
            ...productToAdd,
            quantity: 1
        });
    }

    addCartToHTML();
}

function addCartToHTML() {
    let listCartHTML = document.querySelector('.checkout-container-items');
    listCartHTML.innerHTML = '';

    let totalHTML = document.querySelector('.totalProducts');
    let totalProducts = 0;
    let totalPrice = 0;

    if (listCart.length > 0) {
        listCart.forEach(product => {
            const productTotal = product.price * 1.25 * product.quantity;
            totalProducts += product.quantity;
            totalPrice += productTotal;

            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.innerHTML = `
                <div class="checkout-item">
                    <img src="${product.image}" class="checkout-item-img">
                    <div class="checkout-item-info">
                        <div class="checkout-item-info-text">
                            <h3>${product.title}</h3>
                            <button class="remove" onclick="removeFromCart('${product.id}')">
                                <span class="remove-text">Remove</span>
                            </button>
                        </div>
                        <div class="checkout-item-price">
                            <span class="price">${(product.price * 1.25).toFixed(2)} kr</span>
                            <div class="checkout-item-quantity">
                                <button class="decrease" onclick="changeQuantity('${product.id}', 'decrease')">
                                    <i class="icon-checkout fa-solid fa-minus"></i>
                                </button>
                                <span class="quantity">${product.quantity}</span>
                                <button class="increase" onclick="changeQuantity('${product.id}', 'increase')">
                                    <i class="icon-checkout fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            listCartHTML.appendChild(newCart);
        });
    }
    
    totalHTML.innerHTML = totalProducts;
    document.querySelector('.total-price').textContent = totalPrice.toFixed(2) + ' kr';
}

function changeQuantity(productId, action) {
    const product = listCart.find(item => item.id === productId);
    
    if (product) {
        if (action === 'increase') {
            product.quantity++;
        } else if (action === 'decrease') {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                removeFromCart(productId);
                return;
            }
        }
        addCartToHTML();
    }
}

function removeFromCart(productId) {
    listCart = listCart.filter(item => item.id !== productId);
    addCartToHTML();
}