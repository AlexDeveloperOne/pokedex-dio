const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const tooltip = document.getElementById('tooltip');

const maxRecords = 151
const limit = 10
let offset = 0;
///////////////////////////

function attachTooltipEvents(pokemonElement, pokemon) {
    pokemonElement.addEventListener('mouseover', (event) => {
        const tooltipContent = `
            <div class="tooltip-content ${pokemon.type}">
                <h3>${pokemon.name}</h3>
                <div class="tooltip-section">
                    <h4>Abilities:</h4>
                    <ul>
                        <li>${pokemon.mainAbility}</li>
                        ${pokemon.abilities.map((ability) => `<li>${ability}</li>`).join('')}
                    </ul>
                </div>
                <div class="tooltip-section">
                    <h4>Species:</h4>
                    <ul>${ pokemon.species}</ul>
                </div>
                <div class="tooltip-section">
                    <h4>Stats:</h4>
                    <ul>
                        ${Object.entries(pokemon.stats)
                            .map(([statName, baseStat]) => `<li>${statName}: ${baseStat}</li>`)
                            .join('')}
                    </ul>
                </div>
            </div>
        `;

        const tooltip = document.getElementById('tooltip');
        tooltip.innerHTML = tooltipContent;

        // Posiciona o tooltip em relação ao mouse
        const xOffset = 10;
        const yOffset = 10;

        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;

        // Posição do mouse
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Posiciona o tooltip de forma que ele não ultrapasse as bordas da janela
        let tooltipTop = mouseY + yOffset;
        let tooltipLeft = mouseX + xOffset;

        if (tooltipTop + tooltipHeight > window.innerHeight) {
            tooltipTop = mouseY - tooltipHeight - yOffset;
        }

        if (tooltipLeft + tooltipWidth > window.innerWidth) {
            tooltipLeft = mouseX - tooltipWidth - xOffset;
        }

        tooltip.style.top = tooltipTop + 'px';
        tooltip.style.left = tooltipLeft + 'px';
        tooltip.style.display = 'block';
    });

    pokemonElement.addEventListener('mouseout', () => {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
    });
}




/*




*/
/////////////

function convertPokemonToLi(pokemon) {
    const li = document.createElement('li');
    li.className = 'pokemon ' + pokemon.type;

    const content = `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    `;
    li.innerHTML = content;

    attachTooltipEvents(li, pokemon);

    return li;
}


function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi)
        pokemonList.append(...newHtml);
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

//////////////////////
