console.log('javascript basico');

const apiUrl = "https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72";
let data = [];
const cardsContainer = document.querySelector(".cards");

async function fetchCards() {
  try {
    let response =  await fetch(apiUrl);

    if (response.ok) {
      return response.json();
    }

    throw new Error(response.status);
  } catch (err) {
    console.log(err);
  }
}

function listCards(cards) {
  cardsContainer.innerHTML = "";
  cards.map(itensCard);
}



function itensCard(card) {
  var money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(card.price);

  // <h6 class="card-subtitle mb-1 text-muted">${card.property_type}</h6>

  var photo = card.photo.replace(/x_large|xx_large/gi, "medium");
  const div = document.createElement("div");
  div.style.width = "15rem";
  div.style.margin = "1rem";
  div.className = "card";
  div.innerHTML = `
  <img src="${photo}" class="card-img-top" alt="${card.name}" />
  <div class="card-header">${card.property_type}</div>
  <div class="card-body">
    <a href="#" class="card-link"><b>${card.name}</b></a>
    <p class="card-text">
      <small class="text-muted"><b>${money}</b> / noite</small>
    </p>
  </div>
`;
  cardsContainer.appendChild(div);
}

async function main() {
  data = await fetchCards();
  if(data) {
    listCards(data);
  }
}

main();