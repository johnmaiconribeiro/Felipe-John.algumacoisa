let premiumTimeLeft = 0;
let isPremiumUnlimited = false;
let myVideos = [];

// Vídeos de exemplo
const videos = [
    {
        id: 1,
        title: "Melhor Sunset em Tons de Rosa 🌅",
        channel: "Vibes Rosas",
        views: "245K",
        duration: "12:45",
        thumbnail: "https://picsum.photos/id/1015/320/180",
        is4K: true
    },
    {
        id: 2,
        title: "Tutorial de Edição Roxa no CapCut",
        channel: "Roxo Studio",
        views: "98K",
        duration: "18:22",
        thumbnail: "https://picsum.photos/id/201/320/180",
        is4K: true
    },
    {
        id: 3,
        title: "Música Lo-fi Rosa Roxo para Estudar",
        channel: "Chill Vibes",
        views: "1.2M",
        duration: "1:02:19",
        thumbnail: "https://picsum.photos/id/870/320/180",
        is4K: false
    }
];

function renderVideos(filteredVideos = videos) {
    const grid = document.getElementById('video-grid');
    grid.innerHTML = '';

    filteredVideos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div class="thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                ${video.is4K && (isPremiumUnlimited || premiumTimeLeft > 0) ? 
                    '<div class="fourk-badge">4K</div>' : ''}
                <div class="duration">${video.duration}</div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <div class="channel">${video.channel}</div>
                <div class="views">${video.views} visualizações</div>
            </div>
        `;
        card.addEventListener('click', () => openVideoPlayer(video));
        grid.appendChild(card);
    });
}

function openVideoPlayer(video) {
    const modal = document.getElementById('video-modal');
    document.getElementById('video-title').textContent = video.title;
    document.getElementById('video-channel').textContent = video.channel;
    document.getElementById('video-desc').textContent = "Um vídeo incrível em tons de rosa e roxo! " + 
        (video.is4K && (isPremiumUnlimited || premiumTimeLeft > 0) ? "✅ Qualidade 4K ativada graças ao Premium!" : "Assine Premium para assistir em 4K.");
    
    modal.style.display = 'flex';
    const player = document.getElementById('main-player');
    player.play();
}

function updatePremiumStatus() {
    const statusEl = document.getElementById('premium-status');
    if (isPremiumUnlimited) {
        statusEl.textContent = "Premium Ilimitado";
        statusEl.style.color = "#00ff9d";
    } else if (premiumTimeLeft > 0) {
        statusEl.textContent = `Premium • ${premiumTimeLeft} min restantes`;
    } else {
        statusEl.textContent = "Grátis • 0 min restantes";
    }
}

// Event Listeners
document.getElementById('premium-btn').addEventListener('click', () => {
    document.getElementById('premium-modal').style.display = 'flex';
    document.getElementById('premium-result').classList.add('hidden');
});

document.getElementById('close-premium').addEventListener('click', () => {
    document.getElementById('premium-modal').style.display = 'none';
});

document.getElementById('upload-btn').addEventListener('click', () => {
    document.getElementById('upload-modal').style.display = 'flex';
});

document.getElementById('close-upload').addEventListener('click', () => {
    document.getElementById('upload-modal').style.display = 'none';
});

document.getElementById('close-player').addEventListener('click', () => {
    const modal = document.getElementById('video-modal');
    modal.style.display = 'none';
    document.getElementById('main-player').pause();
});

// Assistir anúncio
document.getElementById('ad-option').querySelector('button').addEventListener('click', () => {
    const result = document.getElementById('premium-result');
    const msg = document.getElementById('premium-msg');
    
    premiumTimeLeft = 30;
    updatePremiumStatus();
    
    msg.textContent = "Você ganhou 30 minutos de Premium! Agora pode assistir em 4K.";
    result.classList.remove('hidden');
    
    setTimeout(() => {
        renderVideos();
    }, 800);
});

// Pagamento simulado
document.getElementById('pay-btn').addEventListener('click', () => {
    const result = document.getElementById('premium-result');
    const msg = document.getElementById('premium-msg');
    
    isPremiumUnlimited = true;
    updatePremiumStatus();
    
    msg.textContent = "Pagamento simulado com sucesso! Você agora tem Premium para sempre.";
    result.classList.remove('hidden');
    
    setTimeout(() => {
        renderVideos();
    }, 800);
});

// Upload
document.getElementById('upload-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('video-title-input').value;
    
    const status = document.getElementById('upload-status');
    status.classList.remove('hidden');
    status.textContent = "Publicando vídeo...";
    
    setTimeout(() => {
        myVideos.push({
            title: title,
            channel: "Você",
            views: "0",
            duration: "0:00",
            thumbnail: "https://picsum.photos/id/237/320/180"
        });
        
        status.textContent = "✅ Vídeo publicado com sucesso! (Simulação)";
        
        setTimeout(() => {
            document.getElementById('upload-modal').style.display = 'none';
            alert("Vídeo publicado! Agora você pode monetizá-lo na aba Monetização.");
        }, 1500);
    }, 1800);
});

// Inicialização
renderVideos();
updatePremiumStatus();

// Busca simples
document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value.toLowerCase();
    const filtered = videos.filter(v => 
        v.title.toLowerCase().includes(query) || 
        v.channel.toLowerCase().includes(query)
    );
    renderVideos(filtered.length ? filtered : videos);
});