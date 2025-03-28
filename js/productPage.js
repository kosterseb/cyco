document.addEventListener('DOMContentLoaded', function () {
	// Get product id from URL
	let url = new URL(window.location.href);
	let productId = url.searchParams.get('product');

	// If no product query parameter, exit early so it doesn't interfere with the main page
	if (!productId) {
		return;
	}

	// Fetch the JSON data
	fetch('JSON/products.json')
		.then((response) => response.json())
		.then((json) => {
			// Find the matching product in all categories
			let product = findProductById(json.categories, productId);

			if (product) {
				// Select the container for the product detail
				const productDiv = document.querySelector('.product');
				productDiv.innerHTML = generateProduct(product);
			} else {
				console.error('Product not found');
			}
		})
		.catch((error) => console.error('Error loading product data:', error));

	// Helper function to find product by id
	function findProductById(categories, productId) {
		for (let category of categories) {
			for (let product of category.products) {
				if (product.id === productId) {
					return product;
				}
			}
		}
		return null;
	}

	// Function to generate HTML for a product
	function generateProduct(product) {
		return `
            <div class="product-page">
                <h2>${product.title}</h2>
                <img src="${product.image}" alt="${product.title}">
                <p>${product.description}</p>
                <span>Price: ${(
									product.price * 1.25
								).toLocaleString()} DKK</span>
                
                <input id="qty-${product.id}" type="number" value="1" min="1">
                <button onclick="addCart('${
									product.id
								}', parseInt(document.getElementById('qty-${
			product.id
		}').value, 10) || 1); openCard();">Add to cart</button>
                <a href="storepage.html"><button id="backButton">Back</button></a>
           </div>
        `;
	}

	if (productId) {
		let videoSection = document.getElementById('introSection');
        let mainSection = document.getElementById('main');
        let marqDiv = document.getElementById('marq');
		videoSection.style.display = 'none';
        mainSection.style.top = '20%';
        
        marqDiv.innerHTML = `<div class="marquee marq">
                    <div class="marquee-content">
                        <div class="marquee-text">
                        STORE  • STORE • STORE  • STORE • STORE  • STORE • STORE  • STORE • STORE  • STORE • STORE  • STORE • 
                        </div>
                     </div>
                </div>`;
	}
});
