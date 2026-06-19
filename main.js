const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

const selectPokemon = document.getElementById("pokemons");

async function cargarPokemones() {

    try {

        const response = await fetch(POKEAPI_URL);
        const data = await response.json();

        data.results.forEach(pokemon => {

        const option = document.createElement("option");

        option.value = pokemon.url;
        option.textContent =
        pokemon.name.charAt(0).toUpperCase() +
        pokemon.name.slice(1);

        selectPokemon.appendChild(option);

        });

    } catch (error) {

        console.error("Error al cargar Pokémon:", error);

    }

}

async function mostrarPokemon(url) {

    if (!url) return;

    try {

        const response = await fetch(url);
        const pokemon = await response.json();

        // NOMBRE
        document.getElementById("pokemon-name").textContent =
        pokemon.name.charAt(0).toUpperCase() +
        pokemon.name.slice(1);

        // IMAGEN
        document.getElementById("pokemon-image").src =
        pokemon.sprites.other["official-artwork"].front_default ||
        pokemon.sprites.front_default;

        // ID, ALTURA Y PESO
        document.getElementById("pokemon-id").textContent = pokemon.id;
        document.getElementById("pokemon-height").textContent = pokemon.height / 10 + " m";
        document.getElementById("pokemon-weight").textContent = pokemon.weight / 10 + " kg";

        // CONTENEDORES
        const stats = document.getElementById("pokemon-stats");
        const abilities = document.getElementById("pokemon-abilities");
        const types = document.getElementById("pokemon-types");

        stats.innerHTML = "";
        abilities.innerHTML = "";
        types.innerHTML = "";

        // TIPOS
        pokemon.types.forEach(type => {

        const li = document.createElement("li");
        li.textContent =
        type.type.name.charAt(0).toUpperCase() +
        type.type.name.slice(1);

        types.appendChild(li);
        });

        // ESTADÍSTICAS
        pokemon.stats.forEach(stat => {

        const li = document.createElement("li");
        li.textContent =
        `${stat.stat.name}: ${stat.base_stat}`;

        stats.appendChild(li);
        });

        // HABILIDADES
        pokemon.abilities.forEach(ability => {

        const li = document.createElement("li");
        li.textContent = ability.ability.name;

        abilities.appendChild(li);
        });

    } catch (error) {

        console.error("Error al cargar detalles:", error);

    }
}

// EVENTO SELECT
selectPokemon.addEventListener("change", (e) => {
    mostrarPokemon(e.target.value);
});

// CARGAR LISTA
cargarPokemones();