let cars = [
  {
    brand: "Toyota",
    model: "Corolla",
    image: "cars/corolla.png",
    year: 2022,
    engineType: "Бензин",
    price: 50,
    rented: false
  },
  {
    brand: "Honda",
    model: "Civic",
    image: "cars/civic.png",
    year: 2021,
    engineType: "Хибрид",
    price: 60,
    rented: false
  },
  {
    brand: "Ford",
    model: "Mustang",
    image: "cars/mustang.png",
    year: 2023,
    engineType: "Бензин",
    price: 100,
    rented: false
  },
  {
    brand: "BMW",
    model: "3 Series",
    image: "cars/3series.png",
    year: 2023,
    engineType: "Бензин",
    price: 80,
    rented: false
  },
  {
    brand: "Mercedes-Benz",
    model: "E-Class",
    image: "cars/eclass.png",
    year: 2022,
    engineType: "Дизел",
    price: 90,
    rented: false
  },
  {
    brand: "Audi",
    model: "A4",
    image: "cars/a4.png",
    year: 2023,
    engineType: "Бензин",
    price: 70,
    rented: false
  },
  {
    brand: "Volkswagen",
    model: "Golf",
    image: "cars/golf.png",
    year: 2022,
    engineType: "Бензин",
    price: 55,
    rented: false
  },
  {
    brand: "Hyundai",
    model: "Elantra",
    image: "cars/elantra1.png",
    year: 2023,
    engineType: "Хибрид",
    price: 65,
    rented: false
  },
  {
    brand: "Kia",
    model: "Optima",
    image: "cars/optima.png",
    year: 2022,
    engineType: "Бензин",
    price: 60,
    rented: false
  },
  {
    brand: "Hyundai",
    model: "i30",
    image: "cars/i30.png",
    year: 2018,
    engineType: "Дизел",
    price: 60,
    rented: false
  },
  
  {
    brand: "Bentley",
    model: "Continental GT",
    image: "cars/continental.png",
    year: 2022,
    engineType: "Бензин",
    price: 150,
    rented: false
  },
  {
    brand: "Ferrari",
    model: "458 Italia",
    image: "cars/ferrari.png",
    year: 2020,
    engineType: "Бензин",
    price: 200,
    rented: false
  },
  {
    brand: "Tesla",
    model: "Model 3",
    image: "cars/model3.png",
    year: 2024,
    engineType: "Електрически",
    price: 130,
    rented: false
  },
  {
    brand: "Tesla",
    model: "Model X",
    image: "cars/modelx.png",
    year: 2023,
    engineType: "Електрически",
    price: 250,
    rented: false
  },
  
  {
    brand: "Volkswagen",
    model: "ID.4",
    image: "cars/id4.png",
    year: 2024,
    engineType: "Електрически",
    price: 230,
    rented: false
  },
  {
    brand: "Opel",
    model: "Mokka-e",
    image: "cars/mokka.png",
    year: 2021,
    engineType: "Електрически",
    price: 250,
    rented: false
  }
];

function displayCars() {
  let carListContainer = document.getElementById("carList");
  carListContainer.innerHTML = "";
  cars.forEach(car => {
    let carDiv = document.createElement("div");
    carDiv.classList.add("car");
    if (car.rented) {
      carDiv.classList.add("rented");
    }
    carDiv.innerHTML = `
      <img src="${car.image}" alt="${car.brand} ${car.model}">
      <h2>${car.brand} ${car.model}</h2>
      <p>Година: ${car.year}</p>
      <p>Тип двигател: ${car.engineType}</p>
      <p>Цена: ${car.price} лв. / за ден</p>
      ${car.rented ? `<button onclick="returnCar('${car.brand}', '${car.model}')">Върни</button>` : `<button onclick="rentCar('${car.brand}', '${car.model}')">Наеми</button>`}
    `;
    carListContainer.appendChild(carDiv);
  });
}

function rentCar(brand, model) {
  let carIndex = cars.findIndex(car => car.brand === brand && car.model === model);
  if (carIndex !== -1) {
    if (!cars[carIndex].rented) {
      let rentalPeriod = prompt(`За колко дни искате да наемете ${brand} ${model}?`);
      rentalPeriod = parseInt(rentalPeriod);
      if (isNaN(rentalPeriod) || rentalPeriod <= 0) {
        alert("Моля, въведете валиден период на наемане.");
        return;
      }
      let totalCost = rentalPeriod * cars[carIndex].price;
      let confirmRental = confirm(`Цената за наемане на ${brand} ${model} за ${rentalPeriod} дни е 
        ${totalCost} лв. Потвърдете наемането.`);
      if (confirmRental) {
        cars[carIndex].rented = true;
        alert(`Вие успешно наехте ${brand} ${model} за ${rentalPeriod} дни.`);
        displayCars();
      }
    } else {
      alert(`Съжаляваме, ${brand} ${model} вече е наета.`);
    }
  } else {
    alert(`Кола ${brand} ${model} не е открита.`);
  }
}

function returnCar(brand, model) {
  let carIndex = cars.findIndex(car => car.brand === brand && car.model === model);
  if (carIndex !== -1) {
    if (cars[carIndex].rented) {
      cars[carIndex].rented = false;
      alert(`Вие успешно върнахте ${brand} ${model}.`);
      displayCars();
    } else {
      alert(`Грешка: ${brand} ${model} не е била наета.`);
    }
  } else {
    alert(`Кола ${brand} ${model} не е намерена.`);
  }
}

function searchCars() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let searchTerms = input.split(',').map(term => term.trim()); 
  let filteredCars = cars.filter(car => {
    return searchTerms.every(term => {
      let matchesBrand = car.brand.toLowerCase().includes(term);
      let matchesModel = car.model.toLowerCase().includes(term);
      let matchesYear = car.year.toString().includes(term);
      let matchesEngine = car.engineType.toLowerCase().includes(term);
      return matchesBrand || matchesModel || matchesYear || matchesEngine;
    });
  });

  displayFilteredCars(filteredCars);
}

function displayFilteredCars(filteredCars) {
  let carListContainer = document.getElementById("carList");
  carListContainer.innerHTML = "";
  filteredCars.forEach(car => {
    let carDiv = document.createElement("div");
    carDiv.classList.add("car");
    if (car.rented) {
      carDiv.classList.add("rented-car");
    }
    carDiv.innerHTML = `
      <img src="${car.image}" alt="${car.brand} ${car.model}">
      <h2>${car.brand} ${car.model}</h2>
      <p>Година: ${car.year}</p>
      <p>Тип двигател: ${car.engineType}</p>
      <p>Цена: ${car.price} лв. / за ден</p>
      ${car.rented ? `<button onclick="returnCar('${car.brand}', '${car.model}')">Върни</button>` : `<button onclick="rentCar('${car.brand}', '${car.model}')">Наеми</button>`}
    `;
    carListContainer.appendChild(carDiv);
  });
}

function showRentedCars() {
  let rentedCars = cars.filter(car => car.rented);
  displayFilteredCars(rentedCars);
}

function showAvailableCars() {
  let availableCars = cars.filter(car => !car.rented);
  displayFilteredCars(availableCars);
}

function toggleDropdown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function showAllCars() {
  displayCars();
}

function toggleStatusDropdown() {
  document.getElementById("statusDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

displayCars();
