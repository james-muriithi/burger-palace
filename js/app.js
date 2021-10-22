/**
 * Business Logic
 */
function Burger(name, image, newBurger = false) {
  this.name = name;
  this.price = 0;
  this.image = image;
  this.toppings = [];
  this.crust = null;
  this.newBurger = newBurger;
}

const toppings = [
  {
    id: 1,
    name: "Bacon",
  },
  {
    id: 2,
    name: "Cheese",
  },
  {
    id: 3,
    name: "Mushrooms",
  },
  {
    id: 4,
    name: "Avocado",
  },
];

const crusts = [
  {
    id: 1,
    name: "Cheese Burst",
    price: 100,
  },
  {
    id: 2,
    name: "Wheat Thin Crust",
    price: 150,
  },
  {
    id: 3,
    name: "New Hand Tossed",
    price: 110,
  },
];

const burgerSizes = [
  {
    size: "small",
    price: 200,
  },
  {
    size: "medium",
    price: 400,
  },
  {
    size: "large",
    price: 600,
  },
];

const burgers = [
  new Burger("Beef Burger", "./images/burger1.png", true),
  new Burger("Spicy Tandoori", "./images/burger2.png"),
  new Burger("Chhese Burger", "./images/burger3.png"),
  new Burger("Buffalo Burger", "./images/burger4.png"),
  new Burger("BBQ Chcken", "./images/burger5.png"),
  new Burger("Crispy Chicken", "./images/burger6.png"),
];

/**
 * Frontend logic
 */

$(function () {
  // append burgers to menu
  $("#menu .menu").html("");
  burgers.forEach((burger) => {
    $("#menu .menu")
      .append(`<div class="col-sm-6 col-md-6 col-xl-4 col-xxl-3 mb-5">
    <div class="menu-card p-3 p-lg-4">
        <div class="ribbon text-center ${burger.newBurger ? "" : "d-none"}">
            New
        </div>
        <div class="text-center">
            <img src="${burger.image}" alt="" class="menu-image img-fluid">
        </div>
        <div class="card-details text-center pt-3">
            <h3 class="menu-title fw-bolder">
                ${burger.name}
            </h3>
            <p class="menu-description pt-2">
                Lorem ipsum dolor sit amet, con sectetur adipiscing elit. Erat mo
                rbi viverra bibendum in sit. Ac semper arcu facilisis ornare
            </p>
        </div>
        <div class="price-cart d-flex mt-5 align-items-center">
            <div class="col-6 price fw-bold">
                Ksh. <span>1200</span>
            </div>
            <div class="col-6 d-flex">
                <span class="add-to-cart d-flex align-items-center ms-auto">
                    <button class="btn" title="add to cart">
                        <img src="./images/shopping-cart.png" alt="cart">
                    </button>
                </span>
            </div>
        </div>
    </div>
</div>`);
  });
});
