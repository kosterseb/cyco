// Getting all the countries from the JSON file
fetch('JSON/countries.json')
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

const toggleText = document.getElementById('toggleText');
const toggleIcon = document.getElementById('toggleIcon');

toggleButton.addEventListener('click', () => {
  if (!itemList.classList.contains('hide')) {
    itemList.classList.add('hide');
    toggleText.textContent = 'Show';
    toggleIcon.classList.remove('open');
  } else {
    itemList.classList.remove('hide');
    toggleText.textContent = 'Hide';
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


document.addEventListener('DOMContentLoaded', () => {
    const payNowButton = document.querySelector('.pay-now');
    const checkoutForm = document.querySelector('.checkout-form');
    const orderSummary = document.querySelector('.order-summary');

    if (!payNowButton || !checkoutForm || !orderSummary) return;

    function movePayNowButton() {
        if (window.innerWidth > 768) {
            if (payNowButton.parentElement !== checkoutForm) {
                checkoutForm.appendChild(payNowButton);
            }
        } else {
            if (payNowButton.parentElement !== orderSummary) {
                orderSummary.appendChild(payNowButton);
            }
        }
    }

    movePayNowButton();
    window.addEventListener('resize', movePayNowButton);
});
