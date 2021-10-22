/**
 * Business Logic
 */
function Burger(id, name, image, newBurger = false) {
  this.id = id;
  this.name = name;
  this.price = 0;
  this.image = image;
  this.toppings = [];
  this.newBurger = newBurger;
}

// burger methods

Burger.prototype.setSize = function (size) {
  const selectedSize = burgerSizes.find((s) => s.size == size);
  if (selectedSize) {
    this.size = selectedSize;
    this.calculatePrice();
  }
};

Burger.prototype.setCrust = function (crustId) {
  const selectedCrust = crusts.find(({ id }) => id == crustId);
  if (selectedCrust) {
    this.crust = selectedCrust;
    this.calculatePrice();
  }
};

Burger.prototype.setToppings = function (toppings) {
  this.toppings = toppings;
  this.calculatePrice();
};

Burger.prototype.calculatePrice = function () {
  let price = 0;
  if (this.size) {
    price += this.size.price;
  }

  if (this.crust) {
    price += this.crust.price;
  }

  if (this.toppings.length > 0) {
    this.toppings.forEach((topping) => {
      price += topping.price;
    });
  }

  this.price = price;
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

Topping.prototype.setPrice = function (size) {
  const price = this.prices.find((sizePrice) => sizePrice.size == size);
  if (price) {
    this.price = price.price;
  } else {
    this.price = 0;
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
  new Burger(1, "Beef Burger", "./images/burger1.png", true),
  new Burger(2, "Spicy Tandoori", "./images/burger2.png"),
  new Burger(3, "Cheese Burger", "./images/burger3.png"),
  new Burger(4, "Buffalo Burger", "./images/burger4.png"),
  new Burger(5, "BBQ Chcken", "./images/burger5.png"),
  new Burger(6, "Crispy Chicken", "./images/burger6.png"),
];

/**
 * Frontend logic
 */

$(function () {
  let selectedBurger;

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
                    <button class="btn open-modal" data-burger="${
                      burger.id
                    }" title="add to cart">
                        <img src="./images/shopping-cart.png" alt="cart">
                    </button>
                </span>
            </div>
        </div>
    </div>
</div>`);
  });

  $(".open-modal").on("click", function () {
    const selectedBurgerId = $(this).data("burger");
    selectedBurger = burgers.find(({ id }) => id == selectedBurgerId);
    $("#crust-toppings-modal").modal("show");
  });

  // append burger sizes
  $(".sizes").html("");
  burgerSizes.forEach(({ size, price }) => {
    $(".sizes").append(`<div class="col-md-6 col-lg-3 col-6 mb-3 mb-md-0">
      <input id="size-${size}" value="${size}" hidden type="radio" class="burger-size">
      <div class="size size-card p-1">
          <div class="text-center pt-2">
              <img src="./images/burger.png" alt="" height="30" class="img-fluid">
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

  // append burger crusts
  $(".crusts").html("");
  crusts.forEach(({ id, name, price }) => {
    $(".crusts").append(`<div class="col-md-6 col-lg-3 col-6 mb-3 mb-md-0">
      <input id="crust-${id}" value="${id}" hidden type="radio" class="burger-crust">
      <div class="size crust-card p-1">
          <div class="text-center pt-2">
              <img src="./images/crust.png" alt="" height="30" class="img-fluid">
          </div>
          <div class="row pt-3 px-2">
              <div class="col-12 text-start">
                  <small class="text-capitalize">${name}</small>
              </div>
              <div class="col-12 fw-bold text-start">
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
    selectedBurger.setSize(sizeCheckbox.val());
    appendToppings(selectedBurger.size.size);
  });

  // select burger crust
  $("body").on("click", ".crust-card", function () {
    // uncheck all sizes first
    $("input.burger-crust").prop("checked", false);
    const crustCheckbox = $(this).prev();
    crustCheckbox.prop("checked", !crustCheckbox.prop("checked"));
    selectedBurger.setCrust(crustCheckbox.val());
  });

  // select burger toppings
  $("body").on("click", ".topping-card", function () {
    // uncheck all sizes first
    // $("input.topping-crust").prop("checked", false);
    const toppingCheckbox = $(this).prev();
    toppingCheckbox.prop("checked", !toppingCheckbox.prop("checked"));
    const selectedToppings = [];
    $("input.burger-topping:checked").each(() => {
      selectedToppings.push(
        toppings.find(({ id }) => id == $(this).prev().val())
      );
    });
    selectedBurger.setToppings(selectedToppings);
  });

  // add to cart
  $(".btn-add-to-cart").on("click", function () {
      if (selectedBurger.size && selectedBurger.crust) {
          console.log(selectedBurger);
      }else{
          alert("Please choose the size and crust");
      }
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

function appendToppings(size) {
  $(".burger--toppings").removeClass("d-none");
  $(".toppings").html("");
  toppings.forEach((topping) => {
    topping.setPrice(size);
    $(".toppings").append(`<div class="col-md-6 col-lg-3 col-6 mb-3 mb-md-0">
          <input id="topping-${topping.id}" value="${topping.id}" hidden type="radio" class="burger-topping">
          <div class="size topping-card p-1">
              <div class="text-center pt-2">
                  <img src="./images/ion_fast-food.png" alt="" height="30" class="img-fluid">
              </div>
              <div class="row pt-3 px-2">
                  <div class="col-12 text-start">
                      <small class="crusttext-capitalize">${topping.name}</small>
                  </div>
                  <div class="col-12 fw-bold text-start">
                      Ksh. ${topping.price}
                  </div>
              </div>
          </div>
        </div>`);
  });
}
