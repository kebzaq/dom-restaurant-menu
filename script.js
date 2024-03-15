// https://vanilla-js-basic-project-8-menu.netlify.app/

import data from "./datafile.js";
import {
  getUniqueCategories,
  getFilteredData,
  capitalizeName,
} from "./utils.js";

const menuLabels = document.querySelector(".menu-labels");
const menuContainer = document.querySelector(".container");
const search = document.querySelector("#search-input");
const addToOrderBtns = document.querySelector(".add-cart");

window.addItemToOrder = addItemToOrder;
window.removeItemFromOrder = removeItemFromOrder;

// const categories = ["all", "breakfast", ...]
const categories = ["all"].concat(getUniqueCategories(data));
//categories.push("order");
let orderItems = [];
let totalOrderCount = getTotalOrderCount();

function getTotalOrderCount() {
  let sum = 0;

  if (!orderItems.length) return 0;

  for (let item of orderItems) {
    sum += item.count;
  }

  return sum;
}

// window.filterCategoryData = filterCategoryData;

function filterCategoryData(event) {
  const btnName = event.target.innerHTML.toLowerCase(); // All, Breakfast

  let filteredData = [];

  const menuButtons = menuLabels.querySelectorAll(".menu-label");

  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].classList.remove("active-menu-btn");
  }

  event.target.classList.add("active-menu-btn");

  if (btnName === "all") {
    filteredData = data;
  } else {
    filteredData = getFilteredData(data, btnName);
  }

  createMenuData(filteredData);
}

const displayShopCart = () => {
  console.log("shop cart", orderItems);
  renderCartData();
};

function renderCartData() {
  menuContainer.innerHTML = "";

  menuContainer.innerHTML += `<div class="cart-text">Order Cart</div>`;

  const buttons = menuLabels.querySelectorAll(".menu-label");

  for (let item of buttons) {
    item.classList.remove("active-menu-btn");
  }
  console.log(orderItems);

  if (orderItems.length) {
    for (let item of orderItems) {
      let newItem = `<div class="card">
        <div class="card-left">
          <img src="${item.img}" alt="" />
        </div>
        <div class="card-right">
          <div class="title">
            <strong class="menu-title">${item.title}</strong>
            <span>$${item.price}</span>
          </div>
          <p>
            ${item.desc}
          </p>
          <button id="${item.id}" onclick="removeItemFromOrder(event)" class="add-cart">Remove</button>
          <span id="each-order-count">${item.count}</span>
        </div>
      </div>`;

      menuContainer.innerHTML += newItem;
    }
  } else {
    menuContainer.innerHTML += "<p class='no-data'>No data found</p>";
  }
}

function removeItemFromOrder(e) {
  const id = e.target.id;
  const item = orderItems.find((item) => item.id == id);

  item.count--;

  if (!item.count) {
    orderItems = orderItems.filter((item) => item.id != id);
  }

  totalOrderCount = getTotalOrderCount();
  document.querySelector("#order-count").innerText = totalOrderCount;
  renderCartData();
}

function addItemToOrder(e) {
  const id = e.target.id;

  const itemExist = orderItems.find((item) => item.id == id);

  if (!orderItems.length || !itemExist) {
    orderItems.push({ ...data.find((d) => d.id == id), count: 1 });
  } else {
    itemExist.count++;
  }

  totalOrderCount = getTotalOrderCount();
  document.querySelector("#order-count").innerText = totalOrderCount;
}

function createMenuBtns() {
  for (let i = 0; i < categories.length; i++) {
    const categoryName = categories[i];
    let customClass;
    if (i === 0) {
      customClass = "menu-label active-menu-btn";
    } else {
      customClass = "menu-label";
    }

    let btn = `<button class="${customClass}">${capitalizeName(
      // const btn = `<button onclick="filterCategoryData(event)" class="${customClass}">${capitalizeName(
      categoryName
    )}</button>`; // All, Breakfast...

    menuLabels.innerHTML += btn;
  }

  menuLabels.innerHTML += `<button id="shop-cart"><i class="fa fa-cutlery fa-1x"></i> Order <span id="order-count">${totalOrderCount}</span></button>`;
  const menuButtons = menuLabels.querySelectorAll(".menu-label");
  const orderCartBtn = menuLabels.querySelector("#shop-cart");

  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].addEventListener("click", filterCategoryData);
  }
  orderCartBtn.addEventListener("click", displayShopCart);
}

createMenuBtns();

function createMenuData(menuData) {
  // menuData = [];
  // [1,2,3]
  menuContainer.innerHTML = "";

  if (menuData.length) {
    for (let i = 0; i < menuData.length; i++) {
      let newItem = `<div class="card">
        <div class="card-left">
          <img src="${menuData[i].img}" alt="" width="100" />
        </div>
        <div class="card-right">
          <div class="title">
            <strong>${capitalizeName(menuData[i].title)}</strong>
            <span>${menuData[i].price}</span>
          </div>
          <p>${menuData[i].desc}</p>
          <button id="${
            menuData[i].id
          }" onclick="addItemToOrder(event)" class="add-cart">Add to order</button>
        </div>
      </div>`;

      menuContainer.innerHTML += newItem;
    }
  } else {
    menuContainer.innerHTML = '<p class="no-data">No data found</p>';
  }
}

createMenuData(data); // [10 menu data]

search.addEventListener("keyup", function (event) {
  // "       mlk      key      " ==> "mlk     key"
  const value = event.target.value.trim().toLowerCase();
  let filteredSearchData = [];

  if (value !== "") {
    for (let item of data) {
      if (item.title.includes(value) || item.desc.includes(value)) {
        filteredSearchData.push(item);
      }
    }
    createMenuData(filteredSearchData);
  }
  // else {
  //   createMenuData(data);
  // }
});

// function addToOrder() {
//   //const addToOrderBtns = document.querySelectorAll(".add-cart");

//   for (let i = 0; i < data.length; i++) {
//     addToOrderBtns[i].addEventListener("click", addItemToOrder);
//   }
// }

addToOrderBtns.addEventListener("click", function (event) {});
