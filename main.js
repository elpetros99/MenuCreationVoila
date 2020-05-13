var firebaseConfig = {
  apiKey: "AIzaSyDqJxxf77PfgSh0p1y-I-bxzlQaRxcUglM",
  authDomain: "voila-258321.firebaseapp.com",
  databaseURL: "https://voila-258321.firebaseio.com",
  projectId: "voila-258321",
  storageBucket: "voila-258321.appspot.com",
  messagingSenderId: "864668667627",
  appId: "1:864668667627:web:6099d0f47aa614715478ae",
  measurementId: "G-JH2ZKCDTWK"
};
// Initialize Firebase


firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.database();

// CREATE MenuItem
var mealClass = document.getElementById('mealClass');
var itemForm = document.getElementById('Menu');
var name = document.getElementById('Name');
var Description = document.getElementById('Description');
var ingredientIDs = document.getElementById('ingredientIDs');
var price = document.getElementById('price');

//Upload Image
var fileButton = document.getElementById("ImageUpload");
fileButton.addEventListener('change', function (e) {
  var file = e.target.files[0];
  var storageRefImage = firebase.storage().ref(file.name);
  storageRefImage.put(file);
});

//Upload Model
var fileButton1 = document.getElementById("ModelUpload");
fileButton1.addEventListener('change', function (e) {
  var file1 = e.target.files[0];
  var storageRefModel = firebase.storage().ref(file1.name);
  storageRefModel.put(file);
});

var review;
var item;
var restaurantid;

let ref = database.ref('/users/' + currentUser.uid).once('value').then(function(snapshot) {
  let userData = snapshot.val();
  restaurantid=userData.restaurantid;
});
    var reviews = document.getElementById('reviews');

    var item = db.ref('/Restaurants/'+ user.restaurantid +'/menu/');


    //Add data to firebase
itemForm.addEventListener('submit', (e) => {

  e.preventDefault();

  if (!mealClass.value || !Name.value || !Description.value || !ingredientIDs.value || !price.value) return null
  var ingredients=[];
  var Pork = document.getElementById("Pork");
  var Chicken = document.getElementById("Chicken");
  var Nuts = document.getElementById("Nuts");
  
  if (Pork.checked == true){
    ingredients.push("Pork");}

  if (Chicken.checked == true){
    ingredients.push("Chicken");}
  
  if (Nuts.checked == true){
    ingriddients.push("Nuts");}

  var id = hiddenId.value || Date.now()

  db.ref('Restaurants/{restaurant}/menu/').set({
    mealClass: mealClass.value,
    Name: Name.value,
    Description: Description.value,
    imageURL: imageURL.value,
    ingredientIDs: ingredients,
    price: price.value
  });


  mealClass.value = "";
  Name.value = "";
  Description.value = "";
  imageURL.value = "";
  ingredientIDs.value = "";
  price.value = "";
});



// READ Items

item.on('child_added', (data) => {
  var li = document.createElement('li')
  li.id = data.key;
  li.innerHTML = reviewTemplate(data.val())
  reviews.appendChild(li);
});

item.on('child_changed', (data) => {
  var reviewNode = document.getElementById(data.key);
  reviewNode.innerHTML = reviewTemplate(data.val());
});

item.on('child_removed', (data) => {
  var reviewNode = document.getElementById(data.key);
  reviewNode.parentNode.removeChild(reviewNode);
});

reviews.addEventListener('click', (e) => {
  var reviewNode = e.target.parentNode

  // UPDATE REVEIW
  if (e.target.classList.contains('edit')) {
    mealClass.value = reviewNode.querySelector('.mealClass').innerText;
    name.value = reviewNode.querySelector('.name').innerText;
    Description.value = reviewNode.querySelector('.Description').innerText;
    price.value = reviewNode.querySelector('.price').innerText;
  }

  // DELETE REVEIW
  if (e.target.classList.contains('delete')) {
    var id = reviewNode.id;
    db.ref('Restaurants/{restaurant}/menu/' + id).remove();
  }
});

function reviewTemplate({ mealClass, Name, Description, ingredientIDs, Price, Calories, imageURL }) {
  return `
    <div class='fullName'>${mealClass}</div>
    <div class='message'>${Name}</div>
    <div class='message'>${Description}</div>
    <div class='message'>${ingredientIDs}</div>
    <div class='message'>${Price}</div>
    <div class='message'>${Calories}</div>
    <img src=${imageURL} alt="">
    <button class='delete'>Delete</button>
    <button class='edit'>Edit</button>
  `
};


//capture ingredients
/*window.onload = populate();

function addItem(id,name){
  var ul = document.getElementById('check'); //ul
  var li = document.createElement('li');//li

  var checkbox = document.createElement('input');
    alert('i');
      checkbox.type = "checkbox";
      checkbox.value = id;
      checkbox.name = name;
  alert(id);
  li.appendChild(checkbox);

  //var text = document.getElementById(name);
  alert(text);
  li.appendChild(createTextNode(name));
  ul.appendChild(li);
}

function populate() {
var ingredientsnames=["hello","oh yeah"];

/*db.ref('indgridients/').on('value', function(snapshot) {
  snapshot.forEach(function(ingridientsSnapshot) {
      var ingredients = ingridientsSnapshot.child("Name").val();
      ingredientsnames.push(ingredients);

  })
  var ingredientsnames=["hello","oh yeah"];

/*db.ref('indgridients/').on('value', function(snapshot) {
  snapshot.forEach(function(ingridientsSnapshot) {
      var ingredients = ingridientsSnapshot.child("Name").val();
      ingredientsnames.push(ingredients);

  })
});

var i;
for (i=0; i<= ingredientsnames.length;i++) {
    addItem(i,ingredientsnames[i]);
    alert("a");
  }
}
}); */