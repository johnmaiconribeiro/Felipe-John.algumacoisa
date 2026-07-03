// app.js
let videos = [
    {
        id: 1,
        title: "Melhor edição de vídeo em 2026",
        channel: "PixelArt Studio",
        views: "245K",
        thumbnail: "https://picsum.photos/id/1015/320/180",
        duration: "12:45"
    },
    {
        id: 2,
        title: "Um dia na vida de uma criadora de conteúdo",
        channel: "Luna Vlogs",
        views: "89K",
        thumbnail: "https://picsum.photos/id/1027/320/180",
        duration: "22:10"
    },
    {
        id: 3,
        title: "Review iPhone 17 Pro - Vale a pena?",
        channel: "Tech Roxo",
        views: "1.2M",
        thumbnail: "https://picsum.photos/id/201/320/180",
        duration: "18:33"
    },
    {
        id: 4,
        title: "Como fazer maquiagem rosa perfeita",
        channel: "Beauty Vibes",
        views: "456K",
        thumbnail: "https://picsum.photos/id/64/320/180",
        duration: "15:20"
    }
];

let currentPremiumTime = 0; // minutos restantes

function renderVideos(filteredVideos) {
    const grid = document.getElementById('video-grid');
    grid.innerHTML = '';
    
    filteredVideos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.innerHTML = `
            <div style="position: relative;">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div style="position: absolute; bottom: 8px; right: 8px; background: rgba(0,0,0,0.8); padding: 2px 6px; border-radius: 4px; font-size: 12px;">${video.duration}</div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <div class="video-channel">${video.channel}</div>
                <div class="video-channel">${video.views} visualizações</div>
            </div>
        `;
        
        card.addEventListener('click', () => openVideo(video));
        grid.appendChild(card);
    });
}

function openVideo(video) {
    const modal = document.getElementById('video-modal');
    document.getElementById('modal-title').textContent = video.title;
    document.getElementById('modal-channel').textContent = `${video.channel} • ${video.views} visualizações`;
    modal.classList.remove('hidden');
    
    const videoEl = document.getElementById('main-video');
    videoEl.play();
    
    // Verifica premium para 4K
    document.querySelectorAll('.quality-btn').forEach(btn => {
        if (btn.dataset.quality === '4k') {
            if (currentPremiumTime > 0) {
                btn.style.opacity = '1';
                btn.style.cursor = 'pointer';
            } else {
                btn.style.opacity = '0.5';
                btn.style.cursor = 'not-allowed';
            }
        }
    });
}

function init() {
    renderVideos(videos);
    
    // Search
    document.getElementById('search-btn').addEventListener('click', () => {
        const term = document.getElementById('search-input').value.toLowerCase();
        const filtered = videos.filter(v => 
            v.title.toLowerCase().includes(term) || 
            v.channel.toLowerCase().includes(term)
        );
        renderVideos(filtered.length ? filtered : videos);
    });
    
    // Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
            const video = document.getElementById('main-video');
            if (video) video.pause();
        });
    });
    
    document.getElementById('upload-btn').addEventListener('click', () => {
        document.getElementById('upload-modal').classList.remove('hidden');
    });
    
    document.getElementById('premium-btn').addEventListener('click', () => {
        document.getElementById('premium-modal').classList.remove('hidden');
        updatePremiumStatus();
    });
    
    // Publish simulation
    document.getElementById('publish-btn').addEventListener('click', () => {
        const title = document.getElementById('upload-title').value || "Novo Vídeo Incrível";
        const newVideo = {
            id: Date.now(),
            title: title,
            channel: "Você",
            views: "0",
            thumbnail: "https://picsum.photos/id/870/320/180",
            duration: "05:00"
        };
        videos.unshift(newVideo);
        renderVideos(videos);
        alert("✅ Vídeo publicado com sucesso! (Simulação)");
        document.getElementById('upload-modal').classList.add('hidden');
    });
    
    // Keyboard ESC
    document.addEventListener('keydown', e => {
        if (e.key === "Escape") {
            document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
        }
    });
}

window.onload = init;