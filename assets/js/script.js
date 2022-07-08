const boxProducts = document.querySelector(".box__products");
const orderList = document.querySelector(".order__list");

function createBoxProducts(products) {
  const tagLi = document.createElement("li");
  tagLi.classList.add("box__items");

  tagLi.innerHTML = `
  <img src='${products.image}' alt='${products.name}'>
  <h3>${products.name}</h3>
  <p>R$ ${products.price.toFixed(2)}</p>
  <button class="items__button" type="button" id="${
    products.id
  }">Adicionar</button>
  `;
  return tagLi;
}

function listProducts(list) {
  for (let i = 0; i < list.length; i++) {
    const product = list[i];
    const template = createBoxProducts(product);
    boxProducts.appendChild(template);
  }
}
listProducts(products);

let cart = [];

boxProducts.addEventListener("click", addProducts);

function addProducts(event) {
  const button = event.target;

  if (button.tagName == "BUTTON") {
    const idProducts = button.id;
    const filter = products.find(function (product) {
      return product.id == idProducts;
    });

    cart.push(filter);
    listProductsCart();
    priceCart();
  }
}

function listProductsCart() {
  orderList.innerHTML = "";

  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    const tagLi = document.createElement("li");

    tagLi.classList.add(".product__info");
    tagLi.innerHTML = `
      <div class="product__info">
      <div class="product__name">
        <img src="${product.image}" alt="${product.name}">
        <p>${product.name}</p>
      </div>
      <div class="product__price">
        <p>R$ ${product.price.toFixed(2)}</p>
        <button>
          <img src="assets/img/lixo.png" alt="Remover produto">
        </button>
      </div>
      </div>`;

    orderList.appendChild(tagLi);
  }
}

function priceCart() {
  const cartTotal = document.querySelector(".cart__total");

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    const product = cart[i];
    total += product.price;
  }
  cartTotal.innerText = `Total: R$ ${total.toFixed(2)}`;
}

const orderListCart = document.querySelector(".order__list");
orderListCart.addEventListener("click", removeProduct);

function removeProduct(event) {
  const buttonRemove = event.target;

  if (buttonRemove.tagName == "BUTTON") {
    buttonRemove.closest("li").remove();
    cart.splice("li", 1);
  }

  priceCart();
}
