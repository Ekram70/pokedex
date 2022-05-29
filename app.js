const pokeContainer = document.getElementById("poke-container");
const pokemonCount = 150;

const colors = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#98d7a5",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
  for (let i = 1; i <= pokemonCount; i++) {
    await getPokemon(i);
  }
};

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  createPokemonCard(data);
};

fetchPokemons();

const createPokemonCard = (data) => {
  const pokeDiv = document.createElement("div");
  pokeDiv.classList.add("pokemon");

  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const id = data.id.toString().padStart(3, "0");
  const pokeType = data.types.map((t) => t.type.name);
  const type = mainTypes.find((t) => pokeType.indexOf(t) > -1);
  const color = colors[type];

  pokeDiv.style.backgroundColor = color;

  const pokeHtml = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" />
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${pokeName}</h3>
        <small class="type">Type: <span>${type}</span></small>
    </div>
  `;

  pokeDiv.innerHTML = pokeHtml;
  pokeContainer.appendChild(pokeDiv);
};
