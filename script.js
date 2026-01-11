const button = document.getElementById("generateSpell");
const spellName = document.getElementById("spellName");
const spellDescription = document.getElementById("spellDescription");

const API_URL = "https://wizard-world-api.herokuapp.com/Spells";

button.addEventListener("click", async () => {
    try {
        const response = await fetch(API_URL);
        const spells = await response.json();

        // unele vrăji nu au effect → le filtrăm
        const spellsWithEffect = spells.filter(spell => spell.effect);

        const randomIndex = Math.floor(Math.random() * spellsWithEffect.length);
        const spell = spellsWithEffect[randomIndex];

        spellName.textContent = spell.name;
        spellDescription.textContent = spell.effect;

    } catch (error) {
        spellName.textContent = "Eroare";
        spellDescription.textContent = "Nu s-au putut încărca vrăjile.";
        console.error(error);
    }
});
