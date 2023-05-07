// variables

let cart = [];

class Products {
    async getProducts() {
        try {
            const response = await fetch("products.json");
            const data = await response.json();
            const products = data.items.map((item) => {
                const { title, price } = item.fields;
                const { id } = item.sys;
                const image = item.fields.image.fields.file.url;
                return { title, price, id, image };
            });
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

// ui
class UI {
    showCart() {
        const cartOverlay = document.querySelector(".cart-overlay");
        const cartDOM = document.querySelector(".cart");
        console.log("show cart");
        cartOverlay.classList.add("transparent-bcg");
        cartDOM.classList.add("show-cart");
    }
    hideCart() {
        const cartOverlay = document.querySelector(".cart-overlay");
        const cartDOM = document.querySelector(".cart");
        cartOverlay.classList.remove("transparent-bcg");
        cartDOM.classList.remove("show-cart");
    }
    initializeApp() {
        const cartButton = document.querySelector(".cart-btn");
        const closeCartButton = document.querySelector(".cart-btn");
        cartButton.addEventListener("click", this.showCart);
        closeCartButton.addEventListener("click", this.hideCart);
    }
    displayProducts(products) {
        let result = "";
        products.forEach((product) => {
            result += `
    <!-- single product -->
        <article class="product">
            <div class="img-container">
            <img
                src=${product.image}
                alt="product"
                class="product-img"
            />
            <button class="bag-btn" data-id=${product.id}>
                <i class="fas fa-shopping-cart"></i>
                add to bag
            </button>
            </div>
            <h3>${product.title}</h3>
            <h4>$${product.price}</h4>
        </article>
        <!-- end of single product -->
    `;
        });
        const sanitizer = new Sanitizer(); // Default sanitizer;

        const productsDOM = document.querySelector(".products-center");
        productsDOM.setHTML(result, { sanitizer }); // セキュリティ観点からサニタイズしてからセット
        return;
    }
}

// class Storage {}

document.addEventListener("DOMContentLoaded", () => {
    const ui = new UI();
    const products = new Products();
    ui.initializeApp();

    products.getProducts().then((products) => ui.displayProducts(products));
});
