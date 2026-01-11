const button = document.getElementById("generateSpell");
const spellName = document.getElementById("spellName");
const spellDescription = document.getElementById("spellDescription");

const API_URL = "https://wizard-world-api.herokuapp.com/Spells";

button.addEventListener("click", async () => {
    try {
        const response = await fetch(API_URL);
        const spells = await response.json();

        const randomIndex = Math.floor(Math.random() * spells.length);
        const spell = spells[randomIndex];

        spellName.textContent = spell.name;
        spellDescription.textContent = spell.description || "Această vrajă nu are descriere.";
    } catch (error) {
        spellName.textContent = "Eroare";
        spellDescription.textContent = "Nu s-au putut încărca vrăjile.";
        console.error(error);
    }
});
