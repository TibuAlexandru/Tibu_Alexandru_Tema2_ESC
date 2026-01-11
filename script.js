const API_URL = "https://wizard-world-api.herokuapp.com/Spells";

const button = document.getElementById("generateSpellBtn");
const spellCard = document.getElementById("spellCard");
const spellName = document.getElementById("spellName");
const spellDescription = document.getElementById("spellDescription");
const errorAlert = document.getElementById("errorAlert");

button.addEventListener("click", () => {
    getRandomSpell();
});

async function getRandomSpell() {
    console.log("➡️ Pornire cerere către API...");

    // Reset UI
    errorAlert.classList.add("hidden");
    spellCard.classList.add("hidden");

    try {
        console.log("🌐 Se face fetch către:", API_URL);
        const response = await fetch(API_URL);

        console.log("📥 Răspuns primit:", response);

        if (!response.ok) {
            throw new Error(`Eroare HTTP: ${response.status}`);
        }

        console.log("📦 Se parsează JSON...");
        const spells = await response.json();

        console.log("📊 Număr de vrăji primite:", spells.length);

        if (spells.length === 0) {
            throw new Error("Lista de vrăji este goală.");
        }

        const randomIndex = Math.floor(Math.random() * spells.length);
        const randomSpell = spells[randomIndex];

        console.log("✨ Vrajă aleasă:", randomSpell);

        spellName.textContent = randomSpell.name || "Vrajă necunoscută";
        spellDescription.textContent =
            randomSpell.description || "Nu există descriere.";

        spellCard.classList.remove("hidden");

        console.log("✅ Vraja a fost afișată cu succes!");

    } catch (error) {
        console.error("❌ Eroare apărută:", error);

        errorAlert.textContent =
            "A apărut o eroare la încărcarea vrăjii. Încearcă din nou.";
        errorAlert.classList.remove("hidden");
    }
}
