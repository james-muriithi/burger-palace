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

// Toppings

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

// burger crusts
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

// burger toppings
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

//  Cart functionality
function Cart() {
  this.items = [];
  this.total = 0;
  this.grandTotal = 0;
  this.deliveryFee = 150;
  this.deliveryMethod = 0;
}

Cart.prototype.addItem = function (burger) {
  if (
    this.items.some((item) => {
      return this.isSameItem(item, burger);
    })
  ) {
    this.items.map((item) => {
      if (item.id == burger.id) {
        item.quantity += 1;
      }
    });
  } else {
    let item = { ...burger, quantity: 1 };
    this.items.push(item);
  }
  this.calculateTotal();
};

Cart.prototype.removeItem = function (itemIndex) {
  this.items = this.items.filter((_, index) => index != itemIndex);
  this.calculateTotal();
};

Cart.prototype.setDeliveryMethod = function (method) {
  this.deliveryMethod = method;
};

Cart.prototype.calculateGrandTotal = function () {
  this.calculateTotal();
  this.grandTotal = this.total;
  if (this.deliveryMethod != 0) {
    this.grandTotal += this.deliveryFee;
  }

  return this.grandTotal;
};

Cart.prototype.calculateTotal = function () {
  this.total = this.items.reduce((prevItem, currentItem) => {
    return prevItem + currentItem.price * currentItem.quantity;
  }, 0);
};

Cart.prototype.clearCart = function () {
  this.items = [];
  this.deliveryMethod = 0;
  this.customerDetails = {};
  this.calculateGrandTotal();
};

Cart.prototype.setCustomerDetails = function ({
  fullName,
  contact,
  location = null,
  info = null,
}) {
  this.customerDetails = {
    fullName,
    contact,
    location,
    info,
  };
};

Cart.prototype.isSameItem = function (item1, item2) {
  const sameCrust = item1.crust.id == item2.crust.id;
  const sameToppings =
    JSON.stringify(item1.toppings.map((c) => c.id)) ==
    JSON.stringify(item2.toppings.map((c) => c.id));
  return item1.id == item2.id && sameCrust && sameToppings;
};

/**
 * Frontend logic
 */

$(function () {
  let selectedBurger;
  let cart = new Cart();

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
    $("input.burger-size, input.burger-crust, input.burger-topping").prop(
      "checked",
      false
    );

    $("#crust-toppings-modal").modal("show");
  });

  // append burger sizes
  $("#crust-toppings-modal .sizes").html("");
  burgerSizes.forEach(({ size, price }) => {
    $("#crust-toppings-modal .sizes")
      .append(`<div class="col-md-6 col-lg-3 col-6 mb-3 mb-md-0">
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
    $("input.burger-topping:checked").each((_, element) => {
      selectedToppings.push(toppings.find(({ id }) => id == $(element).val()));
    });
    selectedBurger.setToppings(selectedToppings);
  });

  // select delivery
  $("body").on("click", ".delivery-card", function () {
    // uncheck all sizes first
    $("input.delivery").prop("checked", false);
    const deliveryCheckbox = $(this).prev();
    deliveryCheckbox.prop("checked", !deliveryCheckbox.prop("checked"));
    if (deliveryCheckbox.val() == 1) {
      $(".delivery-info")
        .removeClass("d-none")
        .find("input")
        .prop("required", true);
    } else {
      $(".delivery-info")
        .addClass("d-none")
        .find("input")
        .prop("required", false);
    }
    cart.setDeliveryMethod(deliveryCheckbox.val());
  });

  //   customer details proceed

  $("#personal-details-form").on("submit", function (e) {
    e.preventDefault();
    const fullName = $("input.fullName").val();
    const contact = $("input.contact").val();
    const location = $("input.location").val();
    const info = $("input.info").val();

    cart.setCustomerDetails({ fullName, contact, location, info });
    cart.calculateGrandTotal();
    updateOrderConfirmedModal(cart);
    $("#delivery-modal").modal("hide");
    // clear cart
    cart.clearCart();
    updateCart(cart);
    $("#personal-details-form")[0].reset();

    $("#order-success-modal").modal("show");
  });

  // add to cart
  $(".btn-add-to-cart").on("click", function () {
    if (selectedBurger.size && selectedBurger.crust) {
      cart.addItem(selectedBurger);
      updateCart(cart);
    } else {
      alert("Please choose the size and crust");
    }
  });

  // remove from cart
  $("body").on("click", ".btn-remove-from-cart", function () {
    cart.removeItem($(this).data("item"));
    updateCart(cart);
  });

  // toggle show cart
  $(".cart").on("click", function () {
    $(".shopping-cart").toggleClass("d-none");
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

  // update cart
  updateCart(cart);
});

function updateCartCount(cartCount = 0) {
  $(".cart-counter").text(cartCount);
}

function updateCartTotal(total = 0) {
  $(".cart-total").text(total);
}

function updateCart(cart) {
  if (cart.items.length > 0) {
    $(".shopping-cart-items").html("");
    $(".btn-checkout").prop("disabled", false);

    cart.items.forEach((item, itemIndex) => {
      $(".shopping-cart-items")
        .append(`<li class="clearfix row align-items-center">
            <div class="col-4">
                <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="col-8 px-0">
                <span class="item-name fw-bold">${item.name} (${
        item.size.size
      })</span>
                <div><small>Crust: ${item.crust.name}</small></div>
                <div><small>Toppings: ${item.toppings
                  .map((t) => t.name)
                  .join(", ")}</small></div>
                <span class="item-price">Ksh ${item.price}</span> X
                <span class="item-quantity">
                    ${item.quantity}
                </span>
                <span class="ms-auto">
                    <button class="btn btn-sm btn-remove-from-cart" data-item="${itemIndex}">
                        <img src="./images/dustbin.png" alt="delete" height="15" width="15"></img>
                    </button>
                </span>
            </div>
        </li>`);
    });
  } else {
    $(".btn-checkout").prop("disabled", true);

    $(".shopping-cart-items").html(`<div class="d-flex justify-content-center">
        <img src="./images/empty-cart.png" alt="empty cart" class="img-fluid" />
        </div>`);
  }

  updateCartCount(cart.items.length);
  updateCartTotal(cart.total);
}

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

function updateOrderConfirmedModal(cart) {
  $(".order-details-container")
    .html(`<div class="row d-flex justify-content-center">
    <div class="col-md-12">
        <div class="card">
            <div class="text-center logo p-2 px-5"> 
                <img src="./images/order-delivery.png" alt="order Confirmed" height="128" width="112">
            </div>
            <div class="invoice p-5">
                <h5>Your order has been Confirmed!</h5>
                <span class="font-weight-bold d-block mt-4 mb-2">Hello, ${
                  cart.customerDetails.fullName
                }</span>
                <span>You order has been placed successfully${
                  cart.deliveryMethod == 1
                    ? " and will be delivered to your location"
                    : ""
                }!</span>
                <div class="payment border-top mt-3 mb-3 border-bottom table-responsive">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td>
                                    <div class="py-2"> <span class="d-block text-muted">Order
                                            Date</span>
                                        <span>${new Date().toDateString()}</span>
                                    </div>
                                </td>
                                <td>
                                    <div class="py-2"> <span class="d-block text-muted">Order
                                            No</span>
                                        <span>MT12332345</span>
                                    </div>
                                </td>
                                ${
                                  cart.deliveryMethod == 1
                                    ? '<td><div class="py-2"> <span class="d-block text-muted">Delivery</span>\
                                    <span>' +
                                      cart.customerDetails.location +
                                      "</span>\
                                </div></td>"
                                    : ""
                                }
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="product border-bottom table-responsive">
                    <table class="table table-borderless">
                        <tbody>
                            ${generateOrderDetails(cart.items)}
                        </tbody>
                    </table>
                </div>
                <div class="row d-flex justify-content-end">
                    <div class="col-md-5">
                        <table class="table table-borderless">
                            <tbody class="totals">
                                <tr>
                                    <td>
                                        <div class="text-left"> <span
                                                class="text-muted">Subtotal</span> </div>
                                    </td>
                                    <td>
                                        <div class="text-right"> <span>Ksh. ${
                                          cart.total
                                        }</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="text-left"> <span
                                                class="text-muted">Shipping Fee</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="text-right"> <span>Ksh. ${
                                          cart.deliveryMethod == 1
                                            ? cart.deliveryFee
                                            : 0
                                        }</span> </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="text-left"> <span
                                                class="text-muted">Discount</span> </div>
                                    </td>
                                    <td>
                                        <div class="text-right"> <span class="text-success">Ksh.
                                                0</span>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="border-top border-bottom">
                                    <td>
                                        <div class="text-left"> <span
                                                class="font-weight-bold">Total</span> </div>
                                    </td>
                                    <td>
                                        <div class="text-right"> <span
                                                class="font-weight-bold">Ksh. ${
                                                  cart.grandTotal
                                                }</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p class="font-weight-bold mb-0">Thanks for shopping with us!</p>
            </div>
        </div>
    </div>
</div>`);
}

function generateOrderDetails(orderItems) {
  let itemsMarkup = ``;
  orderItems.forEach((item) => {
    itemsMarkup += `<tr>
        <td width="20%"> <img src="${item.image}"
                width="90"> </td>
        <td width="60%"> <span class="font-weight-bold">${item.name} (${
      item.size.size
    })</span>
            <div class="product-qty"> <span class="d-block">Quantity:
            ${item.quantity}</span>
                <span>Crust:${item.crust.name}</span> <br>
                <span>Toppings:${item.toppings
                  .map((t) => t.name)
                  .join(", ")}</span>
            </div>
        </td>
        <td width="20%">
            <div class="text-right"> <span class="font-weight-bold">Ksh.
            ${item.price}</span>
            </div>
        </td>
    </tr>`;
  });

  return itemsMarkup;
}
