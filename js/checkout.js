const CartModule = (function () {
	let products = null;
	let listCart = [];

	function fetch_products() {
		fetch('/JSON/products.json')
			.then((response) => response.json())
			.then((data) => {
				products = data;
			})
			.catch((error) => console.error('Error loading products:', error));
	}

	function checkoutPaymentHTML() {
		const checkoutContainer = document.querySelector('.checkout-container');
		if (!checkoutContainer) return;

		const checkoutPaymentDiv = document.createElement('div');
		checkoutPaymentDiv.classList.add('checkout-payment');
		checkoutPaymentDiv.innerHTML = `

const CartModule = (function() {
    let products = null;
    let listCart = [];

    function fetch_products() {
        fetch('/JSON/products.json')
          .then(response => response.json())
          .then(data => {
            products = data;
          })
          .catch(error => console.error('Error loading products:', error));
      }
  
    function checkoutPaymentHTML() {
      const checkoutContainer = document.querySelector('.checkout-container');
      if (!checkoutContainer) return;
  
      const checkoutPaymentDiv = document.createElement('div');
      checkoutPaymentDiv.classList.add('checkout-payment');
      checkoutPaymentDiv.innerHTML = `

        <div class="checkout-payment-total">
          <section class="price-total">
            <span>Subtotal</span>
            <span class="total-price">00.00 Kr</span>
          </section>
          <section class="checkout-paymentmethods">
            <span>Payment methods</span>
            <figure class="payment-methods">
              <img src="https://drive.google.com/thumbnail?id=16ECylO99UtGs08pIByOLIV0Bq8Y_cJAc" alt="">
              <img src="https://drive.google.com/thumbnail?id=1AYRZDgQsyCyIfiubR1eDsOKXY8Xvu9-J" alt="">
              <img src="https://drive.google.com/thumbnail?id=1AiyPYyGwry8PS2LFqzYp82NAL25eIzmI" alt="">
            </figure>
          </section>
        </div>
        <button class="checkout-button">Checkout</button>
      `;
		checkoutContainer.appendChild(checkoutPaymentDiv);
	}

	function addCart(productId) {
		if (!products) return;

		// Find the product in the nested structure
		let productToAdd = null;
		for (const category of products.categories) {
			const foundProduct = category.products.find((p) => p.id === productId);
			if (foundProduct) {
				productToAdd = foundProduct;
				break;
			}
		}
		if (!productToAdd) return;

		// Check if product already exists in cart
		const existingProduct = listCart.find((item) => item.id === productId);
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
		const listCartHTML = document.querySelector('.checkout-container-items');
		if (!listCartHTML) return;

		listCartHTML.innerHTML = '';

		const totalHTML = document.querySelector('.totalProducts');
		let totalProducts = 0;
		let totalPrice = 0;

		listCart.forEach((product) => {
			const productTotal = product.price * 1.25 * product.quantity;
			totalProducts += product.quantity;
			totalPrice += productTotal;

			const newCart = document.createElement('div');
			newCart.classList.add('item');
			newCart.innerHTML = `

      checkoutContainer.appendChild(checkoutPaymentDiv);
    }
  

  
    function addCart(productId) {
      if (!products) return;
  
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
      const listCartHTML = document.querySelector('.checkout-container-items');
      if (!listCartHTML) return;
  
      listCartHTML.innerHTML = '';
  
      const totalHTML = document.querySelector('.totalProducts');
      let totalProducts = 0;
      let totalPrice = 0;
  
      listCart.forEach(product => {
        const productTotal = product.price * 1.25 * product.quantity;
        totalProducts += product.quantity;
        totalPrice += productTotal;
  
        const newCart = document.createElement('div');
        newCart.classList.add('item');
        newCart.innerHTML = `

          <div class="checkout-item">
            <img src="${product.image}" class="checkout-item-img">
            <div class="checkout-item-info">
              <div class="checkout-item-info-text">
                <h3>${product.title}</h3>

                <button class="remove" onclick="removeFromCart('${
									product.id
								}')">

                <button class="remove" onclick="removeFromCart('${product.id}')">

                  <span class="remove-text">Remove</span>
                </button>
              </div>
              <div class="checkout-item-price">

                <span class="price">${(product.price * 1.25).toFixed(
									2
								)} kr</span>
                <div class="checkout-item-quantity">
                  <button class="decrease" onclick="changeQuantity('${
										product.id
									}', 'decrease')">
                    <i class="icon-checkout fa-solid fa-minus"></i>
                  </button>
                  <span class="quantity">${product.quantity}</span>
                  <button class="increase" onclick="changeQuantity('${
										product.id
									}', 'increase')">

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

		// Update the cart icon counter
		if (totalHTML) {
			totalHTML.textContent = totalProducts;
		}
		// Update the total price
		const totalPriceElem = document.querySelector('.total-price');
		if (totalPriceElem) {
			totalPriceElem.textContent = totalPrice.toFixed(2) + ' kr';
		}
	}

	function changeQuantity(productId, action) {
		const product = listCart.find((item) => item.id === productId);
		if (!product) return;

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

	function removeFromCart(productId) {
		listCart = listCart.filter((item) => item.id !== productId);
		addCartToHTML();
	}

	function initializeCart() {
		fetch_products();
		checkoutPaymentHTML();
	}

	// Return publicly accessible methods
	return {
		addCart,
		changeQuantity,
		removeFromCart,
		addCartToHTML,
		checkoutPaymentHTML,
		initializeCart
	};
})();

window.addCart = CartModule.addCart;
window.changeQuantity = CartModule.changeQuantity;
window.removeFromCart = CartModule.removeFromCart;
window.addCartToHTML = CartModule.addCartToHTML;
window.checkoutPaymentHTML = CartModule.checkoutPaymentHTML;
window.initializeCart = CartModule.initializeCart;

document.addEventListener('DOMContentLoaded', () => {
	fetch('checkout-snippet.html')
		.then((response) => response.text())
		.then((html) => {
			const container = document.getElementById('checkoutContainer');
			if (!container) {
				console.error('No #checkoutContainer found in HTML');
				return;
			}
			// Insert the snippet
			container.innerHTML = html;

			// Now attach event listeners for the shop icon & close button
			initializeCheckoutEvents();

			// Now that the snippet is in the DOM, we can safely initialize the cart
			CartModule.initializeCart();
		});
});

function initializeCheckoutEvents() {
	const shopIcon = document.querySelector('.shop-icon');
	const checkoutContainer = document.querySelector('.checkout-container');
	const closeCart = document.querySelector('.close-cart');

	function toggleCart() {
		if (checkoutContainer) {
			checkoutContainer.classList.toggle('open');
		}
	}

	if (shopIcon) {
		shopIcon.addEventListener('click', toggleCart);
	}
	if (closeCart) {
		closeCart.addEventListener('click', toggleCart);
	}
}

// // DOM Elementer

        listCartHTML.appendChild(newCart);
      });
  
      // Update the cart icon counter
      if (totalHTML) {
        totalHTML.textContent = totalProducts;
      }
      // Update the total price
      const totalPriceElem = document.querySelector('.total-price');
      if (totalPriceElem) {
        totalPriceElem.textContent = totalPrice.toFixed(2) + ' kr';
      }
    }
  
    function changeQuantity(productId, action) {
      const product = listCart.find(item => item.id === productId);
      if (!product) return;
  
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
  
    function removeFromCart(productId) {
      listCart = listCart.filter(item => item.id !== productId);
      addCartToHTML();
    }
  
    function initializeCart() {
        fetch_products()
        checkoutPaymentHTML();
    }
  
    // Return publicly accessible methods
    return {
      addCart,
      changeQuantity,
      removeFromCart,
      addCartToHTML,
      checkoutPaymentHTML,
      initializeCart
    };
  })();
  
  window.addCart = CartModule.addCart;
  window.changeQuantity = CartModule.changeQuantity;
  window.removeFromCart = CartModule.removeFromCart;
  window.addCartToHTML = CartModule.addCartToHTML;
  window.checkoutPaymentHTML = CartModule.checkoutPaymentHTML;
  window.initializeCart = CartModule.initializeCart;
  

  document.addEventListener('DOMContentLoaded', () => {
    fetch('checkout-snippet.html')
      .then(response => response.text())
      .then(html => {
        const container = document.getElementById('checkoutContainer');
        if (!container) {
          console.error('No #checkoutContainer found in HTML');
          return;
        }
        // Insert the snippet
        container.innerHTML = html;
  
        // Now attach event listeners for the shop icon & close button
        initializeCheckoutEvents();
  
        // Now that the snippet is in the DOM, we can safely initialize the cart
        CartModule.initializeCart();
      })
  });
  
  function initializeCheckoutEvents() {
    const shopIcon = document.querySelector('.shop-icon');
    const checkoutContainer = document.querySelector('.checkout-container');
    const closeCart = document.querySelector('.close-cart');
  
    function toggleCart() {
      if (checkoutContainer) {
        checkoutContainer.classList.toggle('open');
      }
    }
  
    if (shopIcon) {
      shopIcon.addEventListener('click', toggleCart);
    }
    if (closeCart) {
      closeCart.addEventListener('click', toggleCart);
    }
  }
  
  

  // // DOM Elementer

// const shopIcon = document.querySelector('.shop-icon');
// const checkoutContainer = document.querySelector('.checkout-container');
// const closeCart = document.querySelector('.close-cart');

// // Toggle cart function
// function toggleCart() {
//     checkoutContainer.classList.toggle('open');
// }

// shopIcon.addEventListener('click', toggleCart);
// closeCart.addEventListener('click', toggleCart);

// // The Cart function made into a module so it workds across multiple files
// // In the proejct
// const CartModule = (function() {
//     let products = null;
//     let listCart = [];

//     function fetch_products() {
//         fetch('/JSON/products.json')
//             .then(response => response.json())
//             .then(data => {
//                 products = data;
//                 addDataToHTML();
//             })
//             .catch(error => console.error('Error loading products:', error));
//     }

//     function checkoutPaymentHTML() {
//         const checkoutContainer = document.querySelector('.checkout-container');

//         const checkoutPaymentDiv = document.createElement('div');
//         checkoutPaymentDiv.classList.add('checkout-payment');
//         checkoutPaymentDiv.innerHTML = `
//             <div class="checkout-payment-total">
//                 <section class="price-total">
//                     <span>Subtotal</span>
//                     <span class="total-price">00.00 Kr</span>
//                 </section>
//                 <section class="checkout-paymentmethods">
//                     <span>Payment methods</span>
//                     <figure class="payment-methods">
//                     <img src="https://drive.google.com/thumbnail?id=16ECylO99UtGs08pIByOLIV0Bq8Y_cJAc" alt="">
//                     <img src="https://drive.google.com/thumbnail?id=1AYRZDgQsyCyIfiubR1eDsOKXY8Xvu9-J" alt="">
//                     <img src="https://drive.google.com/thumbnail?id=1AiyPYyGwry8PS2LFqzYp82NAL25eIzmI" alt="">
//                     </figure>
//                 </section>
//                 </div>
//                 <button class="checkout-button">Checkout</button>
//             `;

//             checkoutContainer.appendChild(checkoutPaymentDiv)
//     }

//     function addDataToHTML() {
//         const cart = document.querySelector('.cart');
//         cart.innerHTML = ''; // Clear existing content first
//         products.categories.forEach(category => {
//             category.products.forEach(product => {
//                 cart.innerHTML += `
//                     <div class="product">
//                         <h1>${category.name}</h1>
//                         <h2>${product.title}</h2>
//                         <img src="${product.image}" alt="${product.title}">
//                         <p>${product.description}</p>
//                         <p>${(product.price * 1.25).toFixed(2)} kr</p>
//                         <button onclick="addCart('${product.id}')">Add To Cart</button>
//                     </div>
//                 `;
//             });
//         });
//     }

//     function addCart(productId) {
//         // Find the product in the nested structure
//         let productToAdd = null;

//         for (const category of products.categories) {
//             const foundProduct = category.products.find(p => p.id === productId);
//             if (foundProduct) {
//                 productToAdd = foundProduct;
//                 break;
//             }
//         }

//         if (!productToAdd) return;

//         // Check if product already exists in cart
//         const existingProduct = listCart.find(item => item.id === productId);

//         if (existingProduct) {
//             existingProduct.quantity++;
//         } else {
//             listCart.push({
//                 ...productToAdd,
//                 quantity: 1
//             });
//         }

//         addCartToHTML();
//     }

//     function addCartToHTML() {
//         let listCartHTML = document.querySelector('.checkout-container-items');
//         listCartHTML.innerHTML = '';

//         let totalHTML = document.querySelector('.totalProducts');
//         let totalProducts = 0;
//         let totalPrice = 0;

//         if (listCart.length > 0) {
//             listCart.forEach(product => {
//                 const productTotal = product.price * 1.25 * product.quantity;
//                 totalProducts += product.quantity;
//                 totalPrice += productTotal;

//                 let newCart = document.createElement('div');
//                 newCart.classList.add('item');
//                 newCart.innerHTML = `
//                     <div class="checkout-item">
//                         <img src="${product.image}" class="checkout-item-img">
//                         <div class="checkout-item-info">
//                             <div class="checkout-item-info-text">
//                                 <h3>${product.title}</h3>
//                                 <button class="remove" onclick="removeFromCart('${product.id}')">
//                                     <span class="remove-text">Remove</span>
//                                 </button>
//                             </div>
//                             <div class="checkout-item-price">
//                                 <span class="price">${(product.price * 1.25).toFixed(2)} kr</span>
//                                 <div class="checkout-item-quantity">
//                                     <button class="decrease" onclick="changeQuantity('${product.id}', 'decrease')">
//                                         <i class="icon-checkout fa-solid fa-minus"></i>
//                                     </button>
//                                     <span class="quantity">${product.quantity}</span>
//                                     <button class="increase" onclick="changeQuantity('${product.id}', 'increase')">
//                                         <i class="icon-checkout fa-solid fa-plus"></i>
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 `;
//                 listCartHTML.appendChild(newCart);
//             });
//         }

//         totalHTML.innerHTML = totalProducts;
//         document.querySelector('.total-price').textContent = totalPrice.toFixed(2) + ' kr';
//     }

//     function changeQuantity(productId, action) {
//         const product = listCart.find(item => item.id === productId);

//         if (product) {
//             if (action === 'increase') {
//                 product.quantity++;
//             } else if (action === 'decrease') {
//                 if (product.quantity > 1) {
//                     product.quantity--;
//                 } else {
//                     removeFromCart(productId);
//                     return;
//                 }
//             }
//             addCartToHTML();
//         }
//     }

//     function removeFromCart(productId) {
//         listCart = listCart.filter(item => item.id !== productId);
//         addCartToHTML();
//     }

//     function initializeCart() {
//         fetch_products();
//         checkoutPaymentHTML();
//     }

//     // Initialize the module
//     initializeCart();


//     // Return all functions you want to use globally
//     return {
//         addCart: addCart,
//         changeQuantity: changeQuantity,
//         removeFromCart: removeFromCart,
//         addCartToHTML: addCartToHTML,
//         addDataToHTML: addDataToHTML,
//         checkoutPaymentHTML: checkoutPaymentHTML,
//         initializeCart: initializeCart
//     };
// })();

// // Make all required functions global
// window.addCart = CartModule.addCart;
// window.changeQuantity = CartModule.changeQuantity;
// window.removeFromCart = CartModule.removeFromCart;
// window.addCartToHTML = CartModule.addCartToHTML;
// window.addDataToHTML = CartModule.addDataToHTML;
// window.checkoutPaymentHTML = CartModule.checkoutPaymentHTML;
// window.initializeCart = CartModule.initializeCart;

