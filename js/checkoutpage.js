fetch('/JSON/countries.json')
    .then(response => response.json())
    .then(countries => {
        const selectElement = document.getElementById('country');
        countries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;

            if (country.code === 'DK') {
                option.selected = true;
            }

            selectElement.appendChild(option);
        })
    })
    .catch(error => console.error('Error loading countries:', error));


const cardRadio = document.getElementById('card')
const mobilePayRadio = document.getElementById('mobilePay')
const creditCardForm = document.getElementById('creditCardForm')
const mobilePayMenu = document.getElementById('mobilePayMenu')

function togglePaymentMethod() {
    if (mobilePayRadio.checked) {
        creditCardForm.classList.add('hidden')
        mobilePayMenu.classList.remove('hidden')
    } else if (cardRadio.checked) {
        creditCardForm.classList.remove('hidden')
        mobilePayMenu.classList.add('hidden')
    }
}

cardRadio.addEventListener('change', togglePaymentMethod)
mobilePayRadio.addEventListener('change', togglePaymentMethod)

togglePaymentMethod()

const toggleButton = document.getElementById('toggleButton');
const itemList = document.getElementById('itemList');
// New references:
const toggleText = document.getElementById('toggleText');
const toggleIcon = document.getElementById('toggleIcon');

toggleButton.addEventListener('click', () => {
  // If the item list is currently visible...
  if (!itemList.classList.contains('hide')) {
    // Hide it
    itemList.classList.add('hide');
    // Change text to "Show"
    toggleText.textContent = 'Show';
    // Reset arrow to point down
    toggleIcon.classList.remove('open');
  } else {
    // Show the item list
    itemList.classList.remove('hide');
    // Change text to "Hide"
    toggleText.textContent = 'Hide';
    // Rotate arrow up
    toggleIcon.classList.add('open');
  }
});

// All codes in a variable so its eaiser to add mode
const discounts = {
    "GOCOFFEE20": 0.2
}

let discountPercentage = 0;

// Function to update order summary totals
function updateOrderSummary() {
    const listCart = JSON.parse(localStorage.getItem('listCart')) || [];
    let totalItems = 0;
    let totalPrice = 0;
    
    // Calculate total items and price
    listCart.forEach(product => {
        totalItems += product.quantity;
        totalPrice += product.quantity * product.price * 1.25;
    });

    const finalPrice = totalPrice * (1 - discountPercentage);

    const subtotalTextSpan = document.querySelector('.subtotal span:first-child');
    const subtotalPriceSpan = document.querySelector('.subtotal span:last-child');
    const totalPriceSpan = document.querySelector('.total span:last-child');

    if (subtotalTextSpan) {
        subtotalTextSpan.textContent = `Subtotal · ${totalItems} items`;
    }
    if (subtotalPriceSpan) {
        subtotalPriceSpan.textContent = totalPrice.toLocaleString() + ' kr';
    }
    if (totalPriceSpan) {
        totalPriceSpan.textContent = finalPrice.toLocaleString() + ' kr';
    }
}

const discountInput = document.getElementById('discountCode');
const discountButton = document.getElementById('discountApply');

discountButton.addEventListener('click', () => {
    // Remove any extra white spaces from beginning and end of the code
    const code = discountInput.value.trim().toUpperCase();
    if (discounts.hasOwnProperty(code)) {
        discountPercentage = discounts[code];
        alert(`Discount applied: ${discountPercentage * 100}% off!`);
    } else {
        discountPercentage = 0;
        alert("Invalid discount code.");
    }
    updateOrderSummary();
});

function loadCheckoutCart() {
    const listCart = JSON.parse(localStorage.getItem('listCart')) || [];
    const itemList = document.getElementById('itemList');
    let itemsHTML = '';

    // Build HTML for each cart item
    listCart.forEach(product => {
        // Create an item element with image and title.
        itemsHTML += `
            <div class="item-page">
              <img src="${product.image}" alt="${product.title}" class="item-image">
              <div class="productsTotal">${product.quantity}</div>
              <span class="item-name">${product.title}</span>
              <p class="item-price">${product.price.toLocaleString()} kr</p>
            </div>
        `;
    });

    if (itemsHTML === '') {
        itemsHTML = `<p>No items in your cart.</p>`;
    }

    itemList.innerHTML = itemsHTML;
}

// Initialize functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateOrderSummary();
    loadCheckoutCart();
});


const payNowButton = document.querySelector('.pay-now');
const checkoutForm = document.querySelector('.checkout-form');
const orderSummary = document.querySelector('.order-summary');

function movePayNowButton() {
    if (window.innerWidth > 768) {
        if (!checkoutForm.contains(payNowButton)) {
            checkoutForm.appendChild(payNowButton);
        }
    } else {
        if (!orderSummary.contains(payNowButton)) {
            orderSummary.appendChild(payNowButton);
        }
    }
}

document.addEventListener('DOMContentLoaded', movePayNowButton);
window.addEventListener('resize', movePayNowButton);