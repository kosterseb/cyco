let products = ['Cykler', 'Cykel udstyr', 'Cykel dele'];

document.addEventListener('DOMContentLoaded', function (event) {
	fetch('/JSON/products.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (myJson) {
			//console.log(myJson);

			let keys = Object.keys(myJson);

			keys.forEach(function (element) {
				console.log(myJson.categories[0].products);

				spitItOut(
					myJson.categories[0].name,
					myJson.categories[0].products[0].title,
					myJson.categories[0].products[0].image,
					myJson.categories[0].products[0].description,
					myJson.categories[0].products[0].price
				);
			});
		});
});

function spitItOut(name, title, image, description, price) {
	document.body.innerHTML += `<h1>${name}</h1>`;
	document.body.innerHTML += `<h2>${title}</h2>`;
	document.body.innerHTML += `<img src="${image}">`;
	document.body.innerHTML += `<p>${description}</p>`;
	document.body.innerHTML += `<p>${price}</p>`;
}
