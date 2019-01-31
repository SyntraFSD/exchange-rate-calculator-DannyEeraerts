const currencyinput = document.querySelector('#currencyinput');
const currency1 = document.querySelector('#exchangeCurrency1');
const currency2 = document.querySelector('#exchangeCurrency2');
const button = document.querySelector('#activate');
const exchangDate = document.querySelector('#startdate');
const resultcontainer = document.querySelector('#resultcontainer');
const formulieractive = document.querySelector('#formulier');
const arrows = document.querySelector('#arrows');


  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;

   exchangDate.setAttribute("max", today);
   exchangDate. value = today;


function handlerequest(request){
  console.log(request.status);
  if (request.status >= 200 && request.status < 300) {
    const response = JSON.parse(request.responseText);
    //onderstaande maakt van object een array
    console.log(response);
    const omrekenwaarde = Object.values(response.rates)[0];
    omrekenen(omrekenwaarde);

  } else {
    console.log('error');
  }
}

function exchange(event) {
  event.preventDefault();
  if (currency1.value === currency2.value) {
    omrekenen(1);
  }
  else {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', function (event) {
      if (request.readyState === 4) {
        handlerequest(request);
      }
    });
    console.log(currency1);
    console.log(exchangDate.value);
    console.log(today);

    if ((exchangDate.value > "12/12/1998") && (exchangDate.value < today)) {
      request.open('GET',
        'https://api.exchangeratesapi.io/' + exchangDate.value + '?base=' + currency1.value + '&symbols=' + currency2.value);
      console.log("oude datum");
    }
    else {
      request.open('GET',
        'https://api.exchangeratesapi.io/latest?base=' + currency1.value + '&symbols=' + currency2.value);
      console.log("vandaag");
    }
  }
}

function omrekenen(omrekenwaarde){
  const afronden = parseFloat(currencyinput.value)*omrekenwaarde;
  const afrondenstring = afronden.toLocaleString('nl-BE',{
    style:"currency",
    currency: currency2.value,
    currencyDisplay: 'symbol'
  });
  resultcontainer.value = afrondenstring;

}

function changecurrencyorder(){
  const currencyaid = currency1.value;
  currency1.value = currency2.value;
  currency2.value = currencyaid;
}

formulieractive.addEventListener('submit',exchange);

arrows.addEventListener('click',changecurrencyorder);
