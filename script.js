const API_URL = "https://wizard-world-api.herokuapp.com/Spells";

const generateBtn = document.getElementById("generateSpellBtn");
const spellCard = document.getElementById("spellCard");
const spellName = document.getElementById("spellName");
const spellEffect = document.getElementById("spellEffect");
const spellIcon = document.getElementById("spellIcon");
const spellMeta = document.getElementById("spellMeta").querySelector("tbody");
const errorBox = document.getElementById("errorBox");

generateBtn.addEventListener("click", async () => {
    console.clear();
    console.log("🔮 Generare vrajă random");

    errorBox.classList.add("hidden");
    spellCard.classList.add("hidden");

    try {
        console.log("🌐 Se preiau datele API");
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const spells = await response.json();
        if (!spells.length) throw new Error("Lista de vrăji este goală");

        // Alege random
        const randomIndex = Math.floor(Math.random() * spells.length);
        const spell = spells[randomIndex];
        console.log("✨ Vrajă aleasă:", spell);

        // Textual
        spellName.textContent = spell.name || "Vrajă necunoscută";
        spellEffect.textContent = spell.effect || "Efect necunoscut";

        // Media / badge
        // Exemplu: status colorat după tip (dacă nu există media)
        if (spell.id % 2 === 0) {
            spellIcon.textContent = "✨"; // icon magic
            spellIcon.style.backgroundColor = "#4fc3f7";
        } else {
            spellIcon.textContent = "🪄";
            spellIcon.style.backgroundColor = "#81d4fa";
        }

        // Tabel metadate
        spellMeta.innerHTML = `
            <tr>
                <td>${spell.id || "-"}</td>
                <td>${spell.incantation ? "Activ" : "Inactiv"}</td>
                <td>${spell.spellType || "-"}</td>
                <td>${spell.creator || "-"}</td>
            </tr>
        `;

        // Animatie fade
        spellCard.style.animation = "none";
        spellCard.offsetHeight;
        spellCard.style.animation = null;
        spellCard.classList.remove("hidden");

        console.log("✅ Vrajă afișată cu succes");

    } catch (err) {
        console.error("❌ Eroare:", err);
        errorBox.textContent =
            "Nu s-a putut încărca vraja. Încearcă mai târziu.";
        errorBox.classList.remove("hidden");
    }
});
