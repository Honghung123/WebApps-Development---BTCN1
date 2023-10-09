// Xu ly navbar va Footer
function disableLastActiveNav() {
  const activeNav = document.querySelector(".navbar_link.active");
  if (activeNav) {
    activeNav.classList.remove("active");
  }
}
function disableLastActiveFooter() {
  const activeNav = document.querySelector(".footer_navbar_link.active");
  if (activeNav) {
    activeNav.classList.remove("active");
  }
}

function activeNav(e) {
  if (!e.target.classList.contains(".active")) {
    disableLastActiveNav();
    disableLastActiveFooter();
    let navClick = null;
    let footer_navClick = null;
    document.querySelectorAll(".navbar_link").forEach((nav) => {
      if (nav.innerText == e.target.innerText) {
        navClick = nav;
      }
    });
    document.querySelectorAll(".footer_navbar_link").forEach((nav) => {
      if (nav.innerText == e.target.innerText) {
        footer_navClick = nav;
      }
    });
    navClick.classList.add("active");
    footer_navClick.classList.add("active");
  }
}

document.querySelectorAll(".navbar_link").forEach((nav) => {
  nav.addEventListener("click", activeNav);
});
document.querySelectorAll(".footer_navbar_link").forEach((navFooter) => {
  navFooter.addEventListener("click", activeNav);
});

// Validate info
const listInfoBoard = document.querySelector(".content_info_item");
const listInfo = listInfoBoard.querySelectorAll(".content_info_input");

listInfoBoard
  .querySelectorAll(".content_info_gender>input")
  .forEach((radio) => {
    radio.onfocus = (e) => {
      const gender = document.querySelector(".text-error.gender_message");
      if (gender) {
        e.target.parentElement.parentElement.parentElement.removeChild(gender);
        e.target.classList.toggle("invalid");
      }
    };
  });

listInfo[0].onfocus = (e) => {
  const name = document.querySelector(".text-error.name_message");
  if (name) {
    e.target.parentElement.parentElement.removeChild(name);
    e.target.classList.toggle("invalid");
  }
};
listInfo[1].onfocus = (e) => {
  const address = document.querySelector(".text-error.address_message");
  if (address) {
    e.target.parentElement.parentElement.removeChild(address);
    e.target.classList.toggle("invalid");
  }
};
listInfo[2].onfocus = (e) => {
  const address = document.querySelector(".text-error.tel_message");
  if (address) {
    e.target.parentElement.parentElement.removeChild(address);
    e.target.classList.toggle("invalid");
  }
};
listInfo[3].onfocus = (e) => {
  const address = document.querySelector(".text-error.date_message");
  if (address) {
    e.target.parentElement.parentElement.removeChild(address);
    e.target.classList.toggle("invalid");
  }
};
listInfo[4].onfocus = (e) => {
  const email = document.querySelector(".text-error.email_message");
  if (email) {
    e.target.parentElement.parentElement.removeChild(email);
    e.target.classList.toggle("invalid");
  }
};
function validateInfo() {
  let flag = true;
  let reg = /\b\w+\b/g;
  flag =
    validateNameOrAddr(listInfo[0], "*Họ tên", "name_message", reg) && flag;
  reg = /\b\w+\b/g;
  flag =
    validateNameOrAddr(listInfo[1], "*Địa chỉ", "address_message", reg) && flag;
  reg = /^0\d{9}$/;
  flag =
    validateCommon(listInfo[2], "*Số điện thoại", "tel_message", reg) && flag;
  flag = validateGender("*Giới tính", "gender_message");
  flag = validateDate(listInfo[3], "*Ngày giao hàng", "date_message") && flag;
  reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  flag = validateCommon(listInfo[4], "*Email", "email_message", reg) && flag;
  flag = getAllProductsCart() != "" && flag;
  console.log("Flag: " + flag);
  return flag;
}

function validateNameOrAddr(element, title, className, regex) {
  if (element.value == "" && isErrorMessageExist(className)) {
    const validInfo = createErrorMessageElement(
      `${title} không được để trống`,
      className
    );
    insertAfter(validInfo, element.parentNode);
  } else if (element.value.trim() == "" && isErrorMessageExist(className)) {
    const validInfo = createErrorMessageElement(
      `${title} chưa hợp lệ`,
      className
    );
    insertAfter(validInfo, element.parentNode);
  } else {
    const input = element.value.match(regex);
    if (input) {
      if (input.length > 1) {
        return true;
      } else if (input.length == 1 && isErrorMessageExist(className)) {
        const validInfo = createErrorMessageElement(
          `${title} chưa hợp lệ`,
          className
        );
        insertAfter(validInfo, element.parentNode);
      }
    }
  }
  element.classList.add("invalid");
  return false;
}
function validateCommon(element, title, className, regex) {
  if (element.value == "" && isErrorMessageExist(className)) {
    const validInfo = createErrorMessageElement(
      `${title} chưa được điền`,
      className
    );
    insertAfter(validInfo, element.parentNode);
  } else if (element.value.trim() == "" && isErrorMessageExist(className)) {
    const validInfo = createErrorMessageElement(
      `${title} chưa hợp lệ`,
      className
    );
    insertAfter(validInfo, element.parentNode);
  } else {
    const input = element.value.match(regex);
    if (input) {
      return true;
    } else if (isErrorMessageExist(className)) {
      const validInfo = createErrorMessageElement(
        `${title} chưa hợp lệ`,
        className
      );
      insertAfter(validInfo, element.parentNode);
    }
  }
  element.classList.add("invalid");
  return false;
}
function validateDate(element, title, className) {
  if (element.value == "" && isErrorMessageExist(className)) {
    const validInfo = createErrorMessageElement(
      `${title} chưa được chọn`,
      className
    );
    insertAfter(validInfo, element.parentNode);
  } else {
    const currentDate = getCurrentDate();
    if (currentDate <= element.value) {
      return true;
    } else if (isErrorMessageExist(className)) {
      const validInfo = createErrorMessageElement(
        `${title} không được trước ngày hiện tại`,
        className
      );
      insertAfter(validInfo, element.parentNode);
    }
  }
  element.classList.add("invalid");
  return false;
}
function validateGender(title, className) {
  let maleRadio = document.getElementById("maleRadio");
  let femaleRadio = document.getElementById("femaleRadio");
  if (maleRadio.checked || femaleRadio.checked) {
    return true;
  } else if (isErrorMessageExist(className)) {
    const validInfo = createErrorMessageElement(
      `${title} chưa được chọn`,
      className
    );
    insertAfter(validInfo, maleRadio.parentNode.parentNode);
  }
}
function getAllProductsCart() {
  let nameProducts = "";
  const shop_cart = document.querySelector(".shop_cart");
  shop_cart.querySelectorAll(".shop_list_item").forEach((item) => {
    let nameProduct = item.querySelector(".shop_list_item_name").textContent;
    if (nameProducts == "") {
      nameProducts = nameProduct;
    } else {
      nameProducts += "; " + nameProduct;
    }
  });
  console.log(nameProducts, nameProducts == "");
  if (nameProducts == "") {
    alert("Không thể đăng ký vì không có sản phẩm nào đẫ chọn");
  }
  return nameProducts;
}

function createErrorMessageElement(message, className) {
  const mes = document.createElement("span");
  mes.classList.add("content_info_lable");
  mes.classList.add("text-error");
  mes.classList.add(className);
  mes.innerText = message;
  return mes;
}
function isErrorMessageExist(className) {
  return document.querySelector(".text-error." + className) == null;
}
function insertAfter(newNode, referenceNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function getCurrentDate() {
  let today = new Date();
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");

  let currentDate = year + "-" + month + "-" + day;
  return currentDate;
}

// Add list products
const shopList = document.querySelector(".shop_list_list");
shopList.querySelectorAll(".shop_list_item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
  });
});
shopList
  .querySelectorAll(".shop_list_item>.shop_list_item_image")
  .forEach((item) => toggleActive(item));
shopList
  .querySelectorAll(".shop_list_item>.shop_list_item_name")
  .forEach((item) => toggleActive(item));
shopList
  .querySelectorAll(".shop_list_item.shop_list_item_price")
  .forEach((item) => toggleActive(item));
function toggleActive(item) {
  item.addEventListener("click", (e) => {
    e.target.parentElement.classList.toggle("active");
  });
}
const shopListCard = document.querySelector(".shop_cart");
shopListCard.querySelectorAll(".shop_list_item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.target.classList.toggle("active");
  });
});
shopListCard
  .querySelectorAll(".shop_list_item>.shop_list_item_image")
  .forEach((item) => toggleActive(item));
shopListCard
  .querySelectorAll(".shop_list_item>.shop_list_item_name")
  .forEach((item) => toggleActive(item));
shopListCard
  .querySelectorAll(".shop_list_item.shop_list_item_price")
  .forEach((item) => toggleActive(item));
function toggleActive(item) {
  item.addEventListener("click", (e) => {
    e.target.parentElement.classList.toggle("active");
  });
}

// Add selected product
const addselected = document.querySelector(".add_selected");
addselected.addEventListener("click", (e) => {
  shopList.querySelectorAll(".shop_list_item.active").forEach((item) => {
    console.log(item);
    item.classList.remove("active");
    shopListCard.appendChild(item);
  });
  shopList.querySelectorAll(".shop_list_item.active").forEach((item) => {
    shopList.removeChild(item);
  });
});

// Add all products
const addAll = document.querySelector(".add_all");
addAll.addEventListener("click", (e) => {
  shopList.querySelectorAll(".shop_list_item").forEach((item) => {
    item.classList.remove("active");
    shopListCard.appendChild(item);
  });
  shopList.querySelectorAll(".shop_list_item").forEach((item) => {
    shopList.removeChild(item);
  });
});
// Discard selected product
const discardselected = document.querySelector(".discard_selected");
discardselected.addEventListener("click", (e) => {
  shopListCard.querySelectorAll(".shop_list_item.active").forEach((item) => {
    item.classList.remove("active");
    shopList.appendChild(item);
  });
  shopListCard.querySelectorAll(".shop_list_item.active").forEach((item) => {
    shopListCard.remove(item);
  });
});
// Discard all products
const discardAll = document.querySelector(".discard_all");
discardAll.addEventListener("click", (e) => {
  shopListCard.querySelectorAll(".shop_list_item").forEach((item) => {
    item.classList.remove("active");
    shopList.appendChild(item);
  });
  shopListCard.querySelectorAll(".shop_list_item").forEach((item) => {
    shopListCard.remove(item);
  });
});

// Register
const registerButton = document.querySelector(".content_perchase_register");
registerButton.addEventListener("click", (e) => {
  let result = validateInfo();
  if (result) {
    addRowToTable();
  }
});
function addRowToTable() {
  const name = capitalizeString(listInfo[0].value);
  const address = formatAddress(listInfo[1].value);
  const date = convertDateFormat(listInfo[3].value);
  const maleRadio = document.getElementById("maleRadio");
  const gender = maleRadio.checked ? "Nam" : "Nữ";
  const registers = getAllProductsCart();
  console.log(name, address, date, gender, registers);
  insertRowTable(name, gender, address, date, registers);
}
function capitalizeString(string) {
  let words = string.toLowerCase().split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return words.join(" ");
}
function formatAddress(address) {
  address = capitalizeString(address);
  if (address.startsWith("Tp ")) {
    address = address.replace("Tp ", "TP ");
  }
  return address;
}
function convertDateFormat(dateString) {
  let parts = dateString.split("-");
  let convertedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
  return convertedDate;
}
function insertRowTable() {
  const myTable = document.getElementById("myTable");
  if (myTable.rows[0].cells[0].innerHTML.includes("Register list is empty")) {
    myTable.deleteRow(0);
  }
  const newRow = myTable.insertRow();
  for (let idx = 0; idx < 5; idx++) {
    newRow.insertCell(idx).innerHTML = arguments[idx];
  }
}

// Delete all registers
const deleteAllRegister = document.querySelector(".content_perchase_deleteAll");
deleteAllRegister.addEventListener("click", (e) => {
  const myTable = document.getElementById("myTable");
  while (myTable.rows.length > 0) {
    myTable.deleteRow(0);
  }
  if (myTable.rows.length === 0) {
    let row = myTable.insertRow(0);
    let cell = row.insertCell(0);
    cell.colSpan = 5;
    cell.style.textAlign = "center";
    cell.innerHTML = "Register list is empty";
  }
});

// Xu ly Sidebar
document.querySelectorAll(".sidebar_item").forEach((sidebar) => {
  const downArrow = sidebar.querySelector(".down_arrow");
  const triArrow = sidebar.querySelector(".tri_arrow");
  const dropdownContent = sidebar.querySelector(".dropdown-content");
  const sidebarItemHead = downArrow.parentElement;
  if (sidebarItemHead.classList.contains("active")) {
    downArrow.style.display = "inline-block";
    dropdownContent.style.display = "-webkit-box";
    triArrow.style.display = "none";
  } else {
    downArrow.style.display = "none";
    dropdownContent.style.display = "none";
    triArrow.style.display = "inline-block";
  }
});
document.querySelectorAll(".down_arrow").forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    let sidebarItemHead = e.target.parentElement;
    let triArrow = sidebarItemHead.querySelector(".tri_arrow");
    let sidebarItem = sidebarItemHead.parentElement;
    let dropdownContent = sidebarItem.querySelector(".dropdown-content");
    e.target.style.display = "none";
    sidebarItemHead.classList.remove("active");
    triArrow.style.display = "inline-block";
    dropdownContent.style.display = "none";
  });
});
document.querySelectorAll(".tri_arrow").forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    let sidebarItemHead = e.target.parentElement;
    let downArrow = sidebarItemHead.querySelector(".down_arrow");
    let sidebarItem = sidebarItemHead.parentElement;
    let dropdownContent = sidebarItem.querySelector(".dropdown-content");
    e.target.style.display = "none";
    sidebarItemHead.classList.add("active");
    downArrow.style.display = "inline-block";
    dropdownContent.style.display = "block";
  });
});

// Drag element
document.querySelectorAll(".n-resize").forEach((resize) => {
  let sidebarItemHead = resize.parentElement;
  let sidebarItem = sidebarItemHead.parentElement;
  console.log(resize, sidebarItem, sidebarItemHead);
  dragElement(resize);
});

function dragElement(element) {
  element.xOld = 0;
  element.yOld = 0;
  element.isDown = false;
  element.onmousedown = function (e) {
    element.isDown = true;
    element.xOld = e.clientX;
    element.yOld = e.clientY;
    if (isNaN(parseInt(this.style.left))) {
      this.style.left = this.offsetLeft + "px";
      this.style.top = this.offsetTop + "px";
    }
  };
  element.onmouseup = function (e) {
    this.isDown = false;
  };
  element.onmousemove = function (e) {
    if (this.isDown) {
      let xCur = e.clientX;
      let yCur = e.clientY;
      let dx = xCur - this.xOld;
      let dy = yCur - this.yOld;
      this.xOld = xCur;
      this.yOld = yCur;
      this.style.left = parseInt(this.offsetLeft) + dx + "px";
      this.style.top = parseInt(this.offsetTop) + dy + "px";
    }
  };
}

// Handle navbar list
const navList = document.querySelector("ul.navbar_list");
const navbarLinks = navList.querySelectorAll("a.navbar_link");
if (navbarLinks.length > 5) {
  const expand = document.createElement("span");
  expand.classList.add("navbar_link");
  expand.classList.add("span_navbar");
  expand.innerHTML = "&#9660;";
  const listExpand = document.createElement("ul");
  listExpand.classList.add("span_navbar_list");
  for (let i = 5; i < navbarLinks.length; i++) {
    listExpand.appendChild(navbarLinks[i]);
    // navList.removeChild(navbarLinks[i]);
  }
  navList.appendChild(expand);
  expand.appendChild(listExpand);
}

const navFooterList = document.querySelector("ul.footer_navbar_list");
const navbarFooterLinks = navFooterList.querySelectorAll(
  "a.footer_navbar_link"
);
if (navbarFooterLinks.length > 5) {
  const expand = document.createElement("span");
  expand.classList.add("footer_navbar_link");
  expand.classList.add("span_footer_navbar");
  expand.innerHTML = "&#9650;";
  const listExpand = document.createElement("ul");
  listExpand.classList.add("span_footer_navbar_list");
  for (let i = 5; i < navbarFooterLinks.length; i++) {
    listExpand.appendChild(navbarFooterLinks[i]);
    // navList.removeChild(navbarLinks[i]);
  }
  expand.appendChild(listExpand);
  navFooterList.appendChild(expand);
}
