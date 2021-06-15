// DOM
let formOrder = document.querySelector('#order form');
let inputOrder = document.querySelector('#capacity');
let divPrint1 = document.querySelector('#print');

// Fja vraca promise
function getItems1(resource) {
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

//
let click1 = event => {
  event.preventDefault();
  let capacity = inputOrder.value;
  let itemsNoStock = [];

  getItems1('./json/stock.json')
    .then(data => {
      data.forEach(item => {
        if (item.stock == 0) {
          itemsNoStock.push(item.id);
        }
      });
      return getItems1('./json/weights.json');
    })
    .then(data => {
      let totalWeight = 0;
      data.forEach(item => {
        // da li ovaj niz sadzi id
        if (itemsNoStock.includes(item.id)) {
          // potrebna je tezina
          totalWeight += item.weight;
        }
      });
      // console.log(totalWeight);
      if (totalWeight > capacity) {
        let pMessage = document.createElement('p');
        pMessage.textContent = 'Not enough capacity in truck!';
        divPrint1.appendChild(pMessage);
      } else {
        return getItems1('./json/prices.json');
      }
    })
    .then(data => {
      if (data !== undefined) {
        let totalPrice = 0;
        data.forEach(item => {
          if (itemsNoStock.includes(item.id)) {
            totalPrice += item.price;
          }
        });

        let h2 = document.createElement('h2');
        h2.textContent = 'Your order';
        divPrint1.appendChild(h2);

        // paragraf
        let pMessage = document.createElement('p');
        pMessage.textContent = `Total order price: ${totalPrice}`;
        divPrint1.appendChild(pMessage);

        // tabela
        let table = document.createElement('table');
        let tr = document.createElement('tr');
        let th1 = document.createElement('th');
        th1.textContent = 'Item';
        tr.appendChild(th1);
        let th2 = document.createElement('th');
        th2.textContent = 'Price';
        tr.appendChild(th2);
        table.appendChild(tr);

        data.forEach(item => {
          if (itemsNoStock.includes(item.id)) {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            td1.textContent = item.item;
            tr.appendChild(td1);
            let td2 = document.createElement('td');
            td2.textContent = item.price;
            tr.appendChild(td2);
            table.appendChild(tr);
          }
        });
        let tr2 = document.createElement('tr');
        let td3 = document.createElement('td');
        td3.textContent = 'SUM';
        tr2.appendChild(td3);
        let td4 = document.createElement('td');
        td4.textContent = totalPrice;
        tr2.appendChild(td4);
        table.appendChild(tr2);
        divPrint1.appendChild(table);
      }

      formOrder.reset();
    })
    .catch(err => {
      console.log(err);
    });
};

export default click1;
