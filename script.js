const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):
[];
console.log(itemsArray);

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  createItem(item)
})

function displayItems() {
  let items = "";
  for(let i=0; i < itemsArray.length; i++) {
    let lengthOfText = itemsArray[i].length;
    let rowsNeeded = (lengthOfText-lengthOfText%(28))/(28) + 1;

    items += `<div class="item">
      <div class="input-controller">
        <textarea disabled class="task" rows=${rowsNeeded} cols=29>${itemsArray[i]}</textarea>
        <div class="edit-controller">
          <i class="fa fa-check completeBtn"></i>
          <i class="fa fa-edit editBtn"></i>
          <i class="fa fa-trash deleteBtn"></i>
        </div>
      </div>
      <div class="update-controller">
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
      </div>
    </div>`
  }
  document.querySelector(".to-do-list").innerHTML = items;
  activateCompleteListeners();
  activateDeleteListeners();
  activateEditListeners();
  activateSaveListeners();
  activateCancelListeners();
}

function activateCompleteListeners() {
  const completeBtn = document.querySelectorAll(".completeBtn");
  completeBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {deleteItem(i)});
  })
}

function activateDeleteListeners() {
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  deleteBtn.forEach((db, i) => {
    db.addEventListener("click", () => {deleteItem(i)});
  })
}

function activateEditListeners() {
  const editBtn = document.querySelectorAll(".editBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  const updateController = document.querySelectorAll(".update-controller");
  editBtn.forEach((eb, i) => {
    eb.addEventListener("click", () => {
      updateController[i].style.display = "block";
      inputs[i].disabled = false;
    });
  })
}

function activateCancelListeners() {
  const cancelBtn = document.querySelectorAll(".cancelBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  const updateController = document.querySelectorAll(".update-controller");
  cancelBtn.forEach((cb, i) => {
    cb.addEventListener("click", () => {
      updateController[i].style.display = "none";
      inputs[i].disabled = true;
      location.reload();
    });
  })
}

function activateSaveListeners() {
  const saveBtn = document.querySelectorAll(".saveBtn");
  const inputs = document.querySelectorAll(".input-controller textarea");
  saveBtn.forEach((sb, i) => {
    sb.addEventListener("click", () => {
      updateItem(inputs[i].value, i);
    })
  })
}

function updateItem(text, i) {
  itemsArray[i] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function deleteItem(i) {
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function createItem(item) {
  itemsArray.push(item.value);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  let dateObject = document.querySelector("#date");
  let string = date[0] + " " + date[1] + " " + date[2] + " " + date[3];
  dateObject.value = string;
}

window.onload = function() {
  displayDate();
  displayItems();
}
