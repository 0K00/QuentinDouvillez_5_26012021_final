// Recover product in localstorage
const getTeddy = () => {
	let total = 0;
	if (localStorage.getItem('cart') === null) {
		document.getElementById('title').textContent = 'You have no item in your cart';
		document.getElementById('hiddenForm').style.display = 'none';
		document.getElementById('hiddenData').style.display = 'none';
		document.getElementById('hiddenClear').style.display = 'none';
	} else {
		JSON.parse(localStorage.getItem('cart')).forEach(teddy => {
			const templateElt = document.getElementById('templateCart');
			const cloneElt = document.importNode(templateElt.content, true);

			document.getElementById('title').textContent = 'Your shopping cart';
			cloneElt.getElementById('imageUrl').src = teddy.img;
			cloneElt.getElementById('name').textContent = teddy.name;
			cloneElt.getElementById('color').textContent = teddy.color;
			cloneElt.getElementById('qty').textContent = teddy.qty;
			cloneElt.getElementById('price').textContent = teddy.price / 100 + ' €';
			cloneElt.getElementById('total').textContent = (teddy.price * teddy.qty) / 100 + ' €';

			document.getElementById('cart').appendChild(cloneElt);

			const deleteItem = document.getElementById('clear');
			deleteItem.addEventListener('click', () => {
				localStorage.clear();
			});
			total += (teddy.price * teddy.qty) / 100;
			document.getElementById('subtotal').innerHTML = 'Subtotal ' + total + ' €';
		});
	}
};
getTeddy();

// Form regex and POST
const sendCheckout = document.getElementById('btn-validation');
sendCheckout.addEventListener('click', () => {
	let firstName = document.getElementById('firstName').value;
	let lastName = document.getElementById('lastName').value;
	let email = document.getElementById('email').value;
	let address = document.getElementById('address').value;
	let city = document.getElementById('city').value;

	if (
		(firstName,
		lastName,
		address,
		city,
		email != '' &&
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
	) {
		document.getElementById('invalidRegex').style.display = 'none';
		sendOrder();
		return true;
	} else {
		document.getElementById('invalidRegex').style.display = 'inherit';
		return false;
	}
});

const sendOrder = () => {
	const firstname = document.getElementById('firstName').value;
	const lastname = document.getElementById('lastName').value;
	const address = document.getElementById('address').value;
	const email = document.getElementById('email').value;
	const city = document.getElementById('city').value;

	const products = JSON.parse(localStorage.getItem('cart'));

	const order = {
		contact: {
			firstName: firstname,
			lastName: lastname,
			address: address,
			city: city,
			email: email
		},
		products: products.reduce((table, { id, qty }) => {
			Array.from({ length: qty }).forEach(() => table.push(id));
			return table;
		}, [])
	};
	console.log(order);
	const requestOptions = {
		method: 'POST',
		body: JSON.stringify(order),
		headers: { 'Content-Type': 'application/json; charset=utf-8' }
	};

	fetch('http://localhost:3000/api/teddies/order', requestOptions)
		.catch(() => {
			alert(error);
		})
		.then(response => response.json())
		.then(json => {
			console.log(json);
			localStorage.removeItem('cart');
			localStorage.removeItem('item');
			window.location.href = `${window.location.origin}/font-end/order.html?orderId=${json.orderId}`;
		});
};
