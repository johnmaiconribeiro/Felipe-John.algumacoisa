// premium.js
let premiumEndTime = null;

function isPremiumActive() {
    if (!premiumEndTime) return false;
    return Date.now() < premiumEndTime;
}

function updatePremiumStatus() {
    const statusEl = document.getElementById('premium-status');
    if (isPremiumActive()) {
        const remaining = Math.ceil((premiumEndTime - Date.now()) / 60000);
        statusEl.innerHTML = `Status: <span style="color:#0f0;">Premium (${remaining} min)</span>`;
    } else {
        statusEl.innerHTML = `Status: <span class="free">Grátis</span>`;
    }
}

function activatePremium(minutes) {
    premiumEndTime = Date.now() + (minutes * 60 * 1000);
    updatePremiumStatus();
    alert(`🎉 Premium ativado por ${minutes} minutos! Aproveite o 4K.`);
}

document.addEventListener('DOMContentLoaded', () => {
    // Watch Ad
    const watchAdBtn = document.getElementById('watch-ad-btn');
    if (watchAdBtn) {
        watchAdBtn.addEventListener('click', () => {
            // Simulação de anúncio (2 segundos)
            watchAdBtn.textContent = "Carregando anúncio...";
            setTimeout(() => {
                activatePremium(30);
                watchAdBtn.textContent = "Ver Anúncio (30 min)";
            }, 1800);
        });
    }
    
    // Buy Premium
    const buyBtn = document.getElementById('buy-premium-btn');
    if (buyBtn) {
        buyBtn.addEventListener('click', () => {
            if (confirm("Deseja realmente pagar R$ 5,99 por Premium Vitalício? (Simulação)")) {
                premiumEndTime = Date.now() + (1000 * 60 * 60 * 24 * 365 * 10); // 10 anos
                updatePremiumStatus();
                alert("💎 Premium Vitalício ativado com sucesso!");
            }
        });
    }
    
    // Update status periodically
    setInterval(updatePremiumStatus, 30000);
});