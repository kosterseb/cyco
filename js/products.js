let mainContent = document.getElementById('main');

document.addEventListener('DOMContentLoaded', function (event) {
	// Check if the URL has a 'product' query parameter; if yes, skip rendering the list
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has('product')) {
		return;
	}

	let mainContent = document.getElementById('main');

	fetch('/JSON/products.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (myJson) {
			let productHTML = '';

			myJson.categories.forEach(function (category) {
				productHTML += `
                    <article class="category-section">
                        <h2>${category.name}</h2>
                        <section class="category-products">
                `;

				category.products.forEach(function (product) {
					productHTML += `
                        <div class="products">
                            <a href="storepage.html?product=${product.id}">
                                <img src="${product.image}" alt="${
						product.title
					}">
                                <h2>${product.title}</h2>
                                <span>${(
																	product.price * 1.25
																).toLocaleString()} kr</span>
                            </a>
                        </div>
                    `;
				});

				productHTML += `
                        </section>
                    </article>
                `;
			});

			mainContent.innerHTML = productHTML;
		})
		.catch(function (error) {
			console.error('Error loading the JSON file:', error);
		});
});
