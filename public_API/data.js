const n = document.getElementById('names');
const c = document.getElementById('cities');
const e = document.getElementById('emails');
const num = document.getElementById('numbers');
let row="";
let way = false;
let adatok = [];
let sortinfos;


/* Load API */
fetch("https://random-data-api.com/api/v2/users?size=10")
.then((response) => response.json())
  .then((json) => {

    // Add Data for the HTML
    json.forEach((data) => {
        row += `<div class="data__row">
        <div class="elements"><p>${data.first_name} ${data.last_name}</p></div>
        <div class="elements"><p>${data.address.city}</p></div>
        <div class="elements"><p>${data.email}</p></div>
        <div class="elements"><p>${data.phone_number}</p></div>
        </div>`;
      });
      document.getElementById("datas").innerHTML = row;

    //  Add data-s for the array
      for (const data of json){
        const payload = {
          name: data.first_name+" "+data.last_name,
          city: data.address.city,
          email: data.email,
          phone: data.phone_number,
        };
        adatok.push(payload);
      }
  })
  .catch((err) => console.error(err));


function AddHTML(x){
  row="";
  x.forEach((datas) => {
    row += `<div class="data__row">
    <div class="elements"><p>${datas.name}</p></div>
    <div class="elements"><p>${datas.city}</p></div>
    <div class="elements"><p>${datas.email}</p></div>
    <div class="elements"><p>${datas.phone}</p></div>
    </div>`;
  });
  document.getElementById("datas").innerHTML = row;
}

function ResetHeader(){
  document.getElementById("names").innerHTML = `<h3>Name</h3>`;
  document.getElementById("cities").innerHTML = `<h3>Location</h3>`;
  document.getElementById("emails").innerHTML = `<h3>Email</h3>`;
  document.getElementById("numbers").innerHTML = `<h3>Phone number</h3>`;
}


// Sorting secion
  function Sorting(header){
    let btn = header;
    ResetHeader();
    switch(btn){
      case n:
        SortingName();
        break;
      case c:
        SortingCity();
        break;
      case e:
        SortingEmail();
        break;
      case num:
        SortingNum();
        break;
    }
  }

  function SortingName(){
    way = !way;
    if(way == true){
      sortinfos = adatok.sort((p1, p2) => (p1.name > p2.name) ? 1 : (p1.name < p2.name) ? -1 : 0);
      document.getElementById("names").innerHTML = `<h3>Name &#8595</h3>`;
    } else {
      sortinfos = adatok.sort((p1, p2) => (p1.name < p2.name) ? 1 : (p1.name > p2.name) ? -1 : 0)
      document.getElementById("names").innerHTML = `<h3>Name &#8593</h3>`;
    }
    AddHTML(sortinfos);
  }

  function SortingCity(){
    way = !way;
    if(way == true){
      sortinfos = adatok.sort((p1, p2) => (p1.city > p2.city) ? 1 : (p1.city < p2.city) ? -1 : 0);
      document.getElementById("cities").innerHTML = `<h3>Location &#8595</h3>`;
    } else {
      sortinfos = adatok.sort((p1, p2) => (p1.city < p2.city) ? 1 : (p1.city > p2.city) ? -1 : 0)
      document.getElementById("cities").innerHTML = `<h3>Location &#8593</h3>`;
    }
    AddHTML(sortinfos);
  }

  function SortingEmail(){
    way = !way;
    if(way == true){
      sortinfos = adatok.sort((p1, p2) => (p1.email > p2.email) ? 1 : (p1.email < p2.email) ? -1 : 0);
      document.getElementById("emails").innerHTML = `<h3>Email &#8595</h3>`;
    } else {
      sortinfos = adatok.sort((p1, p2) => (p1.email < p2.email) ? 1 : (p1.email > p2.email) ? -1 : 0)
      document.getElementById("emails").innerHTML = `<h3>Email &#8593</h3>`;
    }
    AddHTML(sortinfos);
  }

  function SortingNum(){
    way = !way;
    if(way == true){
      sortinfos = adatok.sort((p1, p2) => (p1.phone > p2.phone) ? 1 : (p1.phone < p2.phone) ? -1 : 0);
      document.getElementById("numbers").innerHTML = `<h3>Phone number &#8595</h3>`;
    } else {
      sortinfos = adatok.sort((p1, p2) => (p1.phone < p2.phone) ? 1 : (p1.phone > p2.phone) ? -1 : 0)
      document.getElementById("numbers").innerHTML = `<h3>Phone number &#8593</h3>`;
    }
    AddHTML(sortinfos);
  }
  //End Sorting Section

// Searching section
  function Searching(){
    ResetHeader();
    let filter = document.getElementById('filter').value;
    filter = filter.toLowerCase();

    //Get the rows
    const row = document.getElementsByClassName('data__row');

    for (i = 0; i < row.length; i++) { 
      if (!row[i].innerHTML.toLowerCase().includes(filter)) {
          row[i].style.display="none";
      }
      else {
          row[i].style.display="flex";                 
      }
  }
}
