let mainContent = document.getElementById('main');

/* document.addEventListener('DOMContentLoaded', function (event) {
	fetch('/JSON/products.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (myJson) {
			//console.log(myJson);

			myJson.categories.forEach(function (category) {
                mainContent.innerHTML += `<article class="category-products">`;
                
				mainContent.innerHTML += `<h2>${category.name}</h2>`;


				category.products.forEach(function (product) {
					addProduct(
						product.title,
						product.image,
						product.description,
						product.price
					);
				});

				mainContent.innerHTML += `</article>`;
			});
		});
});

function addProduct(title, image, description, price) {
	const productHTML = `
    <div class="product">
        <h2>${title}</h2>
        <img src="${image}" alt="${title}">
        <p>${description}</p>
        <p>${(price * 1.25).toLocaleString()} kr</p>
    </div>
    `;

	mainContent.innerHTML += productHTML;
}
*/
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
                        <div class="product">
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
