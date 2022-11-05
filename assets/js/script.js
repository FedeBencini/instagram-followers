// Shorten getElement func
const getEl = (x) => document.getElementById(x);

// All data necessary
const followersData = getEl("followers");
const followingData = getEl("following");
const notFollowers = getEl("notFollowers");
const notFollowing = getEl("notFollowing");
const numNotFollowers = getEl("numNotFollowers");
const numNotFollowing = getEl("numNotFollowing");

const resultSection = getEl("resultSection");
const submitBtn = getEl("submitBtn");
const deleteBtn = getEl("deleteBtn");

let allNotFollowers = [];
let allNotFollowing = [];

// Processing functions
const checkPeople = () => {
  const arr1Value = followersData.value;
  const arr2Value = followingData.value;
  const allFollowers = getUsers(arr1Value);
  const allFollowing = getUsers(arr2Value);
  allNotFollowers = compareArrays(allFollowing, allFollowers);
  allNotFollowing = compareArrays(allFollowers, allFollowing);
  numNotFollowers.innerHTML = allNotFollowers.length;
  numNotFollowing.innerHTML = allNotFollowing.length;
  toDom(allNotFollowers, notFollowers);
  toDom(allNotFollowing, notFollowing);
  resultSection.tabIndex = "2";
  resultSection.focus();
};

const getUsers = (arr) => {
  let returnArr = [];
  let sent = arr.split("\n");
  for (let i in sent) {
    let goodLine = sent[i];
    if (goodLine.startsWith("Foto ")) {
      words = goodLine.split(" ");
      returnArr.push(words[4]);
    }
  }
  return returnArr;
};

const compareArrays = (arr1, arr2) => {
  let returnArr = [];
  for (let i in arr1) {
    let inHere = false;
    for (let j in arr2) {
      if (arr1[i] === arr2[j]) {
        inHere = true;
        break;
      } else {
        continue;
      }
    }
    if (inHere === false) {
      returnArr.push(arr1[i]);
    }
  }
  return returnArr;
};

const toDom = (arr, id) => {
  //id.innerHTML = arr.toString();
  let html = `<ul>`;
  let users = arr.map((u) => `<li>@${u}</li>`);
  html += users.join("");
  html += `</ul>`;
  id.innerHTML = html;
};

// Deleting function
const deleteAll = () => {
  followersData.value = "";
  followingData.value = "";
  notFollowers.innerHTML = "";
  notFollowing.innerHTML = "";
  numNotFollowers.innerHTML = "";
  numNotFollowing.innerHTML = "";
};

// Event Listeners
submitBtn.addEventListener("click", checkPeople);
deleteBtn.addEventListener("click", deleteAll);
