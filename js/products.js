document.addEventListener('DOMContentLoaded', function (event) {
	const mainContent = document.getElementById('main');
	const marQ = document.getElementById('marq');
	const footer = document.getElementById('footer');

	// Check if the URL has a 'product' query parameter; if yes, skip rendering the list
	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has('product')) {
		return;
	}

	// Set initial marquee content immediately
	marQ.innerHTML = `
    <div class="marquee">
        <div class="marquee-content"
            <div class="marquee-text">
            STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE •STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE •
            STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE •STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE • CATEGORIES • STORE •
            </div>
        </div>
    </div>    
    `;

	fetch('JSON/products.json')
		.then(function (response) {
			return response.json();
		})
		.then(function (myJson) {
			let productHTML = '';

			myJson.categories.forEach(function (category) {
				productHTML += `
                <h2 class="product-title">${category.name}</h2>
                <ul class="category-section">
                    <li class="category-products">
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
																).toLocaleString()} DKK</span>
                            </a>
                        </div>
                    `;
				});

				productHTML += `
                    </li>
                </ul>
                `;
			});

			// Append product content to the existing marquee
			mainContent.innerHTML += productHTML;

			// Open and close titles
			document.querySelectorAll('.product-title').forEach((title) => {
				const ul = title.nextElementSibling;

				title.addEventListener('click', () => {
					document.querySelectorAll('.product-title').forEach((t) => {
						t.style.textDecoration = 'none';
					});

					ul.classList.toggle('show');
                    let footFoot = document.getElementById('footer');

					if (ul.classList.contains('show')) {
						title.style.textDecoration = 'underline';
						footFoot.style.marginTop = '850vh';
					} else if (!ul.classList.contains('show')) {
						footFoot.style.marginTop = '60vh';
					}
				});
			});
		})
		.catch(function (error) {
			console.error('Error loading the JSON file:', error);
		});

	footer.innerHTML = `			
    <div class="marquee">
        <div class="marquee-content"
		    <div class="marquee-text">
					RIDE • EXPLORE • CONNECT • ENJOY • RIDE • EXPLORE • CONNECT • ENJOY •
					RIDE • EXPLORE • CONNECT • ENJOY • RIDE • EXPLORE • CONNECT • ENJOY •
					RIDE • EXPLORE • CONNECT • ENJOY •
			</div>
        </div>
	</div>
	<div class="social-links">
		<a href="#">Instagram</a>
		<a href="#">Facebook</a>
		<a href="#">LinkedIn</a>
	</div>`;
});
