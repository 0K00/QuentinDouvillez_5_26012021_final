async function init() {
	const dataTeddys = await getDataTeddys();
	displayDataTeddy(dataTeddys);
	addTeddy(dataTeddys);
	addItem();
}
init();

// API call
function getDataTeddys() {
	var parsedUrl = new URL(window.location.href);
	return fetch('http://localhost:3000/api/teddies/' + parsedUrl.searchParams.get('id'))
		.then(response => response.json())
		.then(dataTeddys => dataTeddys)
		.catch(error => alert(error));
}

const displayDataTeddy = dataTeddy => {
	document.getElementById('title').textContent = 'His little name is ' + dataTeddy.name;
	document.getElementById('name').textContent = dataTeddy.name;
	document.getElementById('htmlTitle').textContent = dataTeddy.name + ' - Orinoco';
	const color = dataTeddy.colors;
	const colors = document.getElementById('color');
	color.forEach(element => {
		console.log(element);
		const option = document.createElement('option');
		option.text = element;
		option.value = element;
		colors.add(option);
	});
	document.getElementById('price').textContent = dataTeddy.price / 100 + ' €';
	document.getElementById('description').textContent = dataTeddy.description;
	document.getElementById('imageUrl').src = dataTeddy.imageUrl;
};

// Add one per item in localstorage
const addItem = () => {
	const addItem = document.getElementById('numberItem');

	addItem.addEventListener('click', () => {
		let itemStorage = localStorage.getItem('item');
		itemStorage++;
		localStorage.setItem('item', itemStorage);
	});
};

// Add Teddy in localstorage
const addTeddy = dataTeddy => {
	const addItem = document.getElementById('numberItem');
	const addTeddys = {
		id: dataTeddy._id,
		name: dataTeddy.name,
		price: dataTeddy.price,
		img: dataTeddy.imageUrl,
		color: '',
		qty: 1
	};

	let cart = JSON.parse(localStorage.getItem('cart')) || [];
	const addProduct = product => {
		const cartProduct = cart.find(cartItem => cartItem.color === product.color);
		if (cartProduct) {
			cartProduct.qty += product.qty;
		} else {
			cart.push(product);
		}
		localStorage.setItem('cart', JSON.stringify(cart));
	};

	addItem.addEventListener('click', () => {
		let color = document.getElementById('color').selectedIndex;
		addTeddys.color = document.getElementsByTagName('option')[color].value;

		addProduct({
			id: dataTeddy._id,
			name: dataTeddy.name,
			price: dataTeddy.price,
			img: dataTeddy.imageUrl,
			color: addTeddys.color,
			qty: 1
		});

		// Anim for add product
		let itm = document.getElementById('list');
		let cln = itm.cloneNode(true);
		document.getElementById('product').appendChild(cln);
		let timeout;
		cln.style.position = 'absolute';
		cln.style.animation = 'order 1s forwards';
		setTimeout(() => cln.remove(), 1000);
	});
};
