/**
 * Business Logic
 */
function Burger(name, image, newBurger = false) {
  this.name = name;
  this.price = 0;
  this.image = image;
  this.toppings = [];
  this.newBurger = newBurger;
}

// burger methods

Burger.prototype.setSize = function (size) {
  if (burgerSizes.some((s) => (s.size = size))) {
    this.size = size;
  }
};

function Topping(id, name) {
  this.id = id;
  this.name = name;
  this.prices = [
    {
      size: "small",
      price: 50,
    },
    {
      size: "medium",
      price: 80,
    },
    {
      size: "large",
      price: 100,
    },
  ];
}

Topping.prototype.getPrice = function (size) {
  const price = this.prices.find((sizePrice) => sizePrice.size == size);
  if (price) {
    return price.price;
  } else {
    return 0;
  }
};

const toppings = [
  new Topping(1, "Bacon"),
  new Topping(2, "Cheese"),
  new Topping(3, "Mushrooms"),
  new Topping(4, "Avocado"),
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
  new Burger("Cheese Burger", "./images/burger3.png"),
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
        <div class="price-cart d-flex mt-3 mt-sm-5 align-items-center">
            <div class="col-6 price fw-bold"></div>
            <div class="col-6 d-flex">
                <span class="add-to-cart d-flex align-items-center ms-auto">
                    <button class="btn" title="add to cart" data-bs-toggle="modal" data-bs-target="#crust-toppings-modal">
                        <img src="./images/shopping-cart.png" alt="cart">
                    </button>
                </span>
            </div>
        </div>
    </div>
</div>`);
  });

  // append burger sizes

  $(".sizes").html("");
  burgerSizes.forEach(({ size, price }) => {
    $(".sizes").append(`<div class="col-md-6 col-lg-3 col-6 mb-3 mb-md-0">
      <input id="size-small" value="small" hidden type="radio" class="burger-size">
      <div class="size size-card p-1">
          <div class="text-center pt-2">
              <img src="./images/ion_fast-food.png" alt="" height="30" class="img-fluid">
          </div>
          <div class="row pt-3">
              <div class="col-5 text-center">
                  <small class="text-capitalize">${size}</small>
              </div>
              <div class="col-7 fw-bold text-center">
                  Ksh. ${price}
              </div>
          </div>
      </div>
    </div>`);
  });

  // select burger size
  $("body").on("click", ".size-card", function () {
    // uncheck all sizes first
    $("input.burger-size").prop("checked", false);
    const sizeCheckbox = $(this).prev();
    sizeCheckbox.prop("checked", !sizeCheckbox.prop("checked"));
  });

  //   toggle header background on scroll
  $(document).on("scroll", function (e) {
    const scrolledHeight = $(this).scrollTop();
    if (scrolledHeight > 250) {
      $("nav.navbar").removeClass("bg-transparent").addClass("bg-white");
    } else {
      $("nav.navbar").removeClass("bg-white").addClass("bg-transparent");
    }
  });
});
