const API_URL = "https://wizard-world-api.herokuapp.com/Spells";

const generateBtn = document.getElementById("generateSpellBtn");
const spellCard = document.getElementById("spellCard");
const spellName = document.getElementById("spellName");
const spellEffect = document.getElementById("spellEffect");
const errorBox = document.getElementById("errorBox");

generateBtn.addEventListener("click", async () => {
    console.clear();
    console.log("🔮 Buton apăsat - se încearcă generarea unei vraji");

    errorBox.classList.add("hidden");
    spellCard.classList.add("hidden");

    try {
        console.log("🌐 Se trimite request către API:", API_URL);

        const response = await fetch(API_URL);

        console.log("📡 Răspuns primit:", response.status);

        if (!response.ok) {
            throw new Error(`Eroare HTTP: ${response.status}`);
        }

        const spells = await response.json();
        console.log("📜 Lista de vrăji primită:", spells);

        if (!spells.length) {
            throw new Error("Lista de vrăji este goală");
        }

        const randomIndex = Math.floor(Math.random() * spells.length);
        const randomSpell = spells[randomIndex];

        console.log("✨ Vrajă aleasă:", randomSpell);

        spellName.textContent = randomSpell.name || "Vrajă necunoscută";
        spellEffect.textContent =
            randomSpell.effect || "Această vrajă nu are un efect cunoscut.";

        // reset animație fade
        spellCard.style.animation = "none";
        spellCard.offsetHeight; // force reflow
        spellCard.style.animation = null;

        spellCard.classList.remove("hidden");

        console.log("✅ Vrajă afișată cu succes");

    } catch (error) {
        console.error("❌ A apărut o eroare:", error);

        errorBox.textContent =
            "Nu s-a putut încărca vraja. Verifică conexiunea sau încearcă mai târziu.";
        errorBox.classList.remove("hidden");
    }
});
