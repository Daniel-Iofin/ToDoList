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
    items += `<div class="item">
      <div class="input-controller">
        <textarea disabled>${itemsArray[i]}</textarea>
        <div class="edit-controller">
          <i class="fa fa-check deleteBtn"></i>
          <i class="fa fa-edit editBtn"></i>
        </div>
      </div>
      <div class="update-controller">
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
      </div>
    </div>`
  }
  document.querySelector(".to-do-list").innerHTML = items;
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
