let mainContent = document.getElementById('main');

document.addEventListener('DOMContentLoaded', function (event) {
	fetch('/JSON/products.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (myJson) {
			//console.log(myJson);

			myJson.categories.forEach(function (category) {
				category.products.forEach(function (product) {
					spitItOut(
						category.name,
						product.title,
						product.image,
						product.description,
						product.price
					);
				});
			});
		});
});

function spitItOut(name, title, image, description, price) {
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
