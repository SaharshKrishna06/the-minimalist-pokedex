const app = document.getElementById('main-content');
let currentId = 1;
let shiny = false;
const typeColors = {
    fire: '#ff9900', water: '#0080ff', grass: '#1aff53',
    electric: '#fcd200', psychic: '#fcaeff', ice: '#82dcff',
    fighting: '#ce4841', poison: '#7a34fc', ground: '#947751',
    flying: '#b6b5ff', bug: '#1f5728', rock: '#78787c',
    ghost: '#101011', dark: '#2f2f30', dragon: '#4947ba',
    steel: '#a1a1a1', fairy: '#f92fde'
};

const typeIcons = {
  fire: "./icons/fire.svg",
  water: "./icons/water.svg",
  grass: "./icons/grass.svg",
  normal: "./icons/normal.svg",
  electric: "./icons/electric.svg",
  psychic: "./icons/psychic.svg",
  ice: "./icons/ice.svg",
  fighting: "./icons/fighting.svg",
  poison: "./icons/poison.svg",
  ground: "./icons/ground.svg",
  flying: "./icons/flying.svg",
  bug: "./icons/bug.svg",
  rock: "./icons/rock.svg",
  ghost: "./icons/ghost.svg",
  dark: "./icons/dark.svg",
  dragon: "./icons/dragon.svg",
  steel: "./icons/steel.svg",
  fairy: "./icons/fairy.svg"
};


function setAccent(type) {
    document.body.style.setProperty('--accent', typeColors[type] || '#0a84ff');
}

const loader = document.getElementById("loader");

function showLoader() {
  loader.classList.remove("hidden");
}

function hideLoader() {
  loader.classList.add("hidden");
}


async function fetchPokemon(id) {
    showLoader()
    app.innerHTML = '<div class="notice">Loading Pokémon…</div>';
    const start = Date.now();
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        const elapsed = Date.now() - start;
        if (elapsed < 400) {
            await new Promise(resolve => setTimeout(resolve, 400 - elapsed));
        }
        currentId = data.id;
        renderPokemon(data);
    } 
    catch {
        app.innerHTML = '<div class="notice">Pokémon not found.</div>';
    }
    hideLoader();
}

async function searchPokemon() {
    const q = document.getElementById('query').value.toLowerCase().trim();
    if (!q) return;
    fetchPokemon(q);
}

function formatStatName(name) {
  const map = {
    hp: 'HP',
    attack: 'Attack',
    defense: 'Defense',
    'special-attack': 'Sp. Atk',
    'special-defense': 'Sp. Def',
    speed: 'Speed'
  };

  return map[name] || name;
}


function renderPokemon(p) {
    const type = p.types.map(t => t.type.name);
    setAccent(type[0]);

    const sprite = shiny
        ? p.sprites.other['official-artwork'].front_shiny
        : p.sprites.other['official-artwork'].front_default;

    app.innerHTML = `
        <div class="container">
            <div class="card image">
                <img src="${sprite}" alt="${p.name}" />
            </div>

            <div class="card">
                <div class="title">${p.name}</div>
                <div class="subtitle">
                    #${p.id}
                    ${type.map(t => `
                        <span class = "type-icon">
                            <img src = "${typeIcons[t]}" alt = "${t}"/>
                        </span>
                    `).join('')}
                </div>
            </div>

            <div class="card stats">
                ${p.stats.map(s => `
                    <div class="stat">
                        <div class="stat-header">
                            <span>${formatStatName(s.stat.name)}</span> 
                            <span>${s.base_stat}</span>
                        </div>
                        <div class="bar">
                            <div style="width:${Math.min(s.base_stat,100)}%"></div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="controls">
                <button onclick="fetchPokemon(currentId - 1)">← Previous Pokémon</button>
                <button onclick="toggleShiny()">✨Shiny Variant</button>
                <button onclick="fetchPokemon(currentId + 1)">Next Pokémon →</button>
            </div>
        </div>
      `;
}

function toggleShiny() {
    shiny = !shiny;
    fetchPokemon(currentId);
}

fetchPokemon(1);