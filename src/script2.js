// DOM
let formCheck = document.querySelector('#check form');
let inputName = document.querySelector('#article');
let inputPrice1 = document.querySelector('#price1');
let inputPrice2 = document.querySelector('#price2');
let divPrint2 = document.querySelector('#print');

// F return promise
function getItems2(resource) {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function () {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        resolve(data);
      } else if (this.readyState == 4) {
        reject(`Could not fetch data`);
      }
    });
    request.open('GET', resource);
    request.send();
  });
}

//F Click
let click2 = event => {
  event.preventDefault();

  let firstArr = [];
  let secondArr = [];
  let entry1 = inputName.value;
  let entry2 = inputPrice1.value;
  let entry3 = inputPrice2.value;

  getItems2('./json/stock.json')
    .then(data => {
      data.forEach(item => {
        if (item.stock > 0 && item.item.includes(entry1)) {
          firstArr.push(item);
        }
      });

      return getItems2('./json/prices.json');
    })
    .then(data => {
      data.forEach(item => {
        if (item.price > entry2 && item.price < entry3) {
          secondArr.push(item);
        }
      });

      let newArr = [];
      let itemId = undefined;
      let itemStock = undefined;
      firstArr.forEach(item1 => {
        itemId = item1.id;
        itemStock = item1.stock;
        secondArr.forEach(item2 => {
          if (itemId == item2.id) {
            item2.stock = itemStock;
            newArr.push(item2);
          }
        });
      });

      // List
      let h2 = document.createElement('h2');
      h2.textContent = 'Available items';
      divPrint2.appendChild(h2);
      let ul = document.createElement('ul');
      newArr.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `<img src="./img/angle-right-solid.svg" alt=""> <span>${item.item}</span>`;
        ul.appendChild(li);
      });
      divPrint2.appendChild(ul);

      // Table
      let table = document.createElement('table');
      let tr = document.createElement('tr');
      let th1 = document.createElement('th');
      th1.textContent = 'Item';
      tr.appendChild(th1);
      let th2 = document.createElement('th');
      th2.textContent = 'Stock';
      tr.appendChild(th2);
      let th3 = document.createElement('th');
      th3.textContent = 'Price';
      tr.appendChild(th3);
      table.appendChild(tr);

      newArr.forEach(item => {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.textContent = item.item;
        tr.appendChild(td1);
        let td2 = document.createElement('td');
        td2.textContent = item.stock;
        tr.appendChild(td2);
        let td3 = document.createElement('td');
        td3.textContent = item.price;
        tr.appendChild(td3);
        table.appendChild(tr);
      });
      divPrint2.appendChild(table);

      formCheck.reset();
    })
    .catch(err => {
      console.log(err);
    });
};

export default click2;
