async function init() {
	const dataTeddys = await getDataTeddys();
	dataTeddys.forEach(teddy => displayDataTeddy(teddy));
	item();
}
init();

// API call
function getDataTeddys() {
	return fetch('http://localhost:3000/api/teddies')
		.then(response => response.json())
		.then(dataTeddys => dataTeddys)
		.catch(error => alert(error));
}

// Template auto fill for index page
const displayDataTeddy = dataTeddy => {
	const templateElt = document.getElementById('templateProduct');
	const cloneElt = document.importNode(templateElt.content, true);

	cloneElt.getElementById('name').textContent = dataTeddy.name;
	cloneElt.getElementById('price').textContent = dataTeddy.price / 100 + ' €';
	cloneElt.getElementById('description').textContent = dataTeddy.description;
	cloneElt.getElementById('imageUrl').src = dataTeddy.imageUrl;
	cloneElt.getElementById('productUrl').href = 'product.html?id=' + dataTeddy._id;

	document.getElementById('product').appendChild(cloneElt);
};

// Display number of item
const item = () => {
	let numberItem = document.getElementById('numberItem');
	let itemStorage = localStorage.getItem('item');
	if (localStorage.key('item') === null) {
		numberItem.innerHTML = 'You have no item in your cart.';
	} else if (localStorage.getItem('item') === '1') {
		numberItem.innerHTML = `You have ${itemStorage} item in your cart.`;
	} else {
		numberItem.innerHTML = `You have ${itemStorage} items in your cart.`;
	}
};
