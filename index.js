var addButton = document.getElementsByClassName('add')[0];
var key = 0;
var debug = document.getElementsByClassName('debug')[0];
var form = document.forms[0];
var household = document.getElementsByClassName('household')[0];
var json = {};

addButton.onclick = validate; // declare validate function
form.onsubmit = addJson; // declare json function

function addJson() {
  var length = document.getElementsByClassName('household')[0]
                       .getElementsByTagName('li').length;
  if (length <= 0) {
    validate();
  } else {
    debug.innerHTML = ''; // empty json
    debug.innerHTML = JSON.stringify(json, null, 2); // add serialized json
    debug.style.display = 'block';
    return false;
  }
}

function addMember(age, rel, smoker) {
  var listItem = document.createElement('li'); // create list item
  var html = capitalize(rel) + ', ' + age + ' years old'; // create list item text
  smoker ? html += ', Smoker ' : html  + ' '; // check if smoker
  listItem.innerHTML = html;
  listItem.setAttribute('id', key); // add id attribute

  json[key] = {
    age: age,
    relationship: rel,
    smoker: smoker
  }

  var deleteButton = document.createElement('button'); // create delete button
  deleteButton.innerHTML = 'Delete';
  listItem.appendChild(deleteButton); // append delete button to list item
  household.appendChild(listItem); // append list item to household list

  deleteButton.onclick = function() {
    var itemToRemove = this.parentNode;
    itemToRemove.parentNode.removeChild(itemToRemove); // delete item from list
    delete json[itemToRemove.id]; // delete item from json
    debug.style.display = 'none';
  }
  key++;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function validate() {
  var age = parseInt(form.age.value);
  var rel = form.rel.value;
  var smoker = form.smoker.checked;

  if  (age === '' || isNaN(age) || age <= 0) {
      alert('Please enter an age greater than 0.');
      return false;
  } else if (rel === '') {
      alert('Please select a relationship.');
      return false;
  } else {
      addMember(age, rel, smoker);
      form.age.value = '';
      form.rel.value = '';
      form.smoker.checked = false;
      debug.style.display = 'none';
      return false;
  }
}
