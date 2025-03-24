
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
	document.body.innerHTML += `<div class="product">`;
	document.body.innerHTML += `<h1>${name}</h1>`;
	document.body.innerHTML += `<h2>${title}</h2>`;
	document.body.innerHTML += `<img src="${image}" alt="${title}">`;
	document.body.innerHTML += `<p>${description}</p>`;
	document.body.innerHTML += `<p>${price * 1.25} kr</p>`;
	document.body.innerHTML += `</div>`;
}
