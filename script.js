const itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")):
[];
const completedItems = localStorage.getItem("completed") ? JSON.parse(localStorage.getItem("completed")):
[];
var completedCount = localStorage.getItem("completedCount") ? JSON.parse(localStorage.getItem("completedCount")):
0;
const removedItems = localStorage.getItem("removed") ? JSON.parse(localStorage.getItem("removed")):
[];
var removedCount = localStorage.getItem("removedCount") ? JSON.parse(localStorage.getItem("removedCount")):
0;

document.querySelector("#enter").addEventListener("click", () => {
  const item = document.querySelector("#item");
  const date = document.querySelector("#dueDate");
  const time = document.querySelector("#dueTime");
  createItem(item, date, time);
})

function displayItems() {
  let items = "";
  for(let i=0; i < itemsArray.length; i++) {
    let lengthOfText = itemsArray[i][0].length;
    let rowsNeeded = (lengthOfText-lengthOfText%(54))/(54) + 1;

    let dueDate = itemsArray[i][1].split("-");
    let dueYear = parseInt(dueDate[0]);
    let dueMonth = parseInt(dueDate[1]);
    let dueDay = parseInt(dueDate[2]);
    let dueYearDecimal = dueYear + dueMonth/12 + dueDay/31/12;
    dueDateFormatted = dueMonth+"/"+dueDay+"/"+dueYear;

    items += `<div class="item">
      <div class="input-controller">
        <textarea disabled class="task" rows=${rowsNeeded} cols=54>${itemsArray[i][0]}</textarea>
        <div class="edit-controller">
          <p class="dueInfo">${dueDateFormatted} ${itemsArray[i][2]}</p>
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

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1;
    let currentDay = currentDate.getDate();
    let currentYearDecimal = currentYear + currentMonth/12 + currentDay/31/12;
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
    cb.addEventListener("click", () => {completeItem(i)});
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
  itemsArray[i][0] = text;
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function completeItem(i) {
  completedItems.push(itemsArray[i]);
  completedCount++;
  localStorage.setItem("completedCount", JSON.stringify(completedCount));
  localStorage.setItem("completed", JSON.stringify(completedItems));
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function deleteItem(i) {
  removedItems.push(itemsArray[i]);
  removedCount++;
  localStorage.setItem("removedCount", JSON.stringify(removedCount));
  localStorage.setItem("removed", JSON.stringify(removedItems));
  itemsArray.splice(i, 1);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  location.reload();
}

function createItem(item, date, time) {
  itemsArray.push([item.value, date.value, time.value]);
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
