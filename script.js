function openInvitation() {
    showPage('anasayfa');
}

function showPage(page) {
    const modal = document.getElementById('pageModal');
    const pageContent = document.getElementById('pageContent');
    
    let content = '';
    
    switch(page) {
        case 'anasayfa':
            content = `
                <div class="page-section">
                    <h2>Tuğba & Resul Can</h2>
                    <p style="text-align: center; font-size: 18px; color: #8b7355; margin-bottom: 30px;">
                        29 Ekim 2026 - Velora Davet Evi
                    </p>
                    <p>En özel günümüzde sizleri aramızda görmekten mutluluk duyarız.</p>
                    <div class="info-box">
                        <p><strong>Tarih:</strong> 29 Ekim 2026 - Perşembe</p>
                        <p><strong>Saat:</strong> 19.00</p>
                        <p><strong>Mekan:</strong> Velora Davet Evi</p>
                        <p><strong>Adres:</strong> Macera Park, 2. Coşkun Sk. M Blok No:13</p>
                    </div>
                </div>
            `;
            break;
            
        case 'hikayemiz':
            content = `
                <div class="page-section">
                    <h2>Hikayemiz</h2>
                    <p>Tuğba ve Resul Can'ın aşk hikayesi, sıradan bir tanışmayla başladı. Zamanın geçişi içinde, birbirlerine olan sevgileri arttıkça, hayatın en güzel kararını vermişlerdir.</p>
                    <p style="margin-top: 20px;">Şimdi, bu güzel yolculuğun resmi başlangıcında, sevdikleri insanlarla bu mutluluğu paylaşmak istiyorlar.</p>
                    <p style="margin-top: 20px; color: #d4af87; font-weight: bold;">Birlikte daha güzel...</p>
                </div>
            `;
            break;
            
        case 'galeri':
            content = `
                <div class="page-section">
                    <h2>Galeri</h2>
                    <div class="gallery-grid">
                        <div class="gallery-item">📸 Fotoğraf 1</div>
                        <div class="gallery-item">📸 Fotoğraf 2</div>
                        <div class="gallery-item">📸 Fotoğraf 3</div>
                        <div class="gallery-item">📸 Fotoğraf 4</div>
                        <div class="gallery-item">📸 Fotoğraf 5</div>
                        <div class="gallery-item">📸 Fotoğraf 6</div>
                    </div>
                </div>
            `;
            break;
            
        case 'bilgiler':
            content = `
                <div class="page-section">
                    <h2>Bilgiler</h2>
                    <div class="info-box">
                        <h3 style="color: #4a5f3f; margin-bottom: 10px;">Davet Saati</h3>
                        <p>19.00 - Resepsiyon başlayacak</p>
                    </div>
                    <div class="info-box">
                        <h3 style="color: #4a5f3f; margin-bottom: 10px;">Dress Code</h3>
                        <p>Resmi (Davetli kıyafeti)</p>
                    </div>
                    <div class="info-box">
                        <h3 style="color: #4a5f3f; margin-bottom: 10px;">Mekan Bilgisi</h3>
                        <p><strong>Velora Davet Evi</strong><br>
                        Macera Park, 2. Coşkun Sk.<br>
                        M Blok No:13</p>
                    </div>
                    <div class="info-box">
                        <h3 style="color: #4a5f3f; margin-bottom: 10px;">Önemli Notlar</h3>
                        <p>Lütfen daveti 15 gün öncesinde cevaplandırınız.</p>
                        <p>Herhangi bir alerjisi veya özel diyeti olan misafirlerimiz, lütfen bize bildirin.</p>
                    </div>
                </div>
            `;
            break;
            
        case 'konum':
            content = `
                <div class="page-section">
                    <h2>Konum</h2>
                    <div class="info-box" style="margin: 30px 0;">
                        <p><strong>Velora Davet Evi</strong></p>
                        <p>Macera Park, 2. Coşkun Sk.</p>
                        <p>M Blok No:13</p>
                    </div>
                    <p>Mekanımız şehrin en güzel semtinde, kolay ulaşılabilir bir konumdadır.</p>
                    <p style="margin-top: 15px;"><strong>Ulaşım:</strong></p>
                    <p>Otopark imkanı bulunmaktadır.</p>
                    <p style="margin-top: 15px;"><strong>GPS Koordinatları:</strong> Harita uygulamanıza "Velora Davet Evi" yazarak ulaşabilirsiniz.</p>
                </div>
            `;
            break;
            
        case 'gunumuz':
            content = `
                <div class="page-section">
                    <h2>Büyük Günümüze Kalan Süre</h2>
                    <div class="countdown-label">
                        Düğün Tarihi: 29 Ekim 2026
                    </div>
                    <div class="countdown" id="countdown">
                        Hesaplanıyor...
                    </div>
                    <p style="text-align: center; margin-top: 30px;">Her geçen gün heyecanımız artıyor... 💕</p>
                </div>
            `;
            setTimeout(updateCountdown, 100);
            break;
            
        case 'rsvp':
            content = `
                <div class="page-section">
                    <h2>RSVP</h2>
                    <p style="text-align: center; margin-bottom: 25px;">Lütfen daveti 15 gün öncesinde cevaplandırınız.</p>
                    <form class="rsvp-form" onsubmit="handleRSVP(event)">
                        <input type="text" placeholder="Adınız Soyadınız" required>
                        <input type="email" placeholder="E-mail Adresiniz" required>
                        <input type="tel" placeholder="Telefon Numaranız" required>
                        <select style="padding: 12px; border: 2px solid #d4af87; border-radius: 5px; font-family: 'Georgia', serif; font-size: 16px;">
                            <option value="">Katılım Durumu</option>
                            <option value="evet">Evet, Katılacağım ✓</option>
                            <option value="hayir">Hayır, Katılamayacağım ✗</option>
                        </select>
                        <textarea placeholder="Özel Mesajınız (İsteğe bağlı)..." rows="4"></textarea>
                        <button type="submit" class="submit-btn">RSVP Gönder</button>
                    </form>
                    <p style="text-align: center; margin-top: 20px; font-size: 13px; color: #8b7355;">
                        Bilgileriniz güvenle saklanacak ve sadece davet organizasyonunda kullanılacaktır.
                    </p>
                </div>
            `;
            break;
            
        case 'muzik':
            content = `
                <div class="page-section">
                    <h2>Müzik</h2>
                    <p>Düğün günü müzik listesi.</p>
                    <div class="info-box" style="margin-top: 30px;">
                        <p><strong>Şarkı:</strong> Love Love Love</p>
                        <p style="margin-top: 10px; color: #8b7355;">Resepsiyon sırasında çalacak özel müzikler...</p>
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="font-size: 14px; color: #8b7355;">🎵 Müzik playlist yakında eklenecek 🎵</p>
                    </div>
                </div>
            `;
            break;
    }
    
    pageContent.innerHTML = content;
    modal.style.display = 'block';
}

function closePage() {
    const modal = document.getElementById('pageModal');
    modal.style.display = 'none';
}

function updateCountdown() {
    const weddingDate = new Date('2026-10-29T00:00:00').getTime();
    const now = new Date().getTime();
    const difference = weddingDate - now;
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; text-align: center;">
                <div>
                    <div style="font-size: 36px; color: #4a5f3f;">${days}</div>
                    <div style="font-size: 12px; color: #8b7355;">Gün</div>
                </div>
                <div>
                    <div style="font-size: 36px; color: #4a5f3f;">${hours}</div>
                    <div style="font-size: 12px; color: #8b7355;">Saat</div>
                </div>
                <div>
                    <div style="font-size: 36px; color: #4a5f3f;">${minutes}</div>
                    <div style="font-size: 12px; color: #8b7355;">Dakika</div>
                </div>
                <div>
                    <div style="font-size: 36px; color: #4a5f3f;">${seconds}</div>
                    <div style="font-size: 12px; color: #8b7355;">Saniye</div>
                </div>
            </div>
        `;
    }
}

function handleRSVP(event) {
    event.preventDefault();
    alert('Daveti cevapladığınız için teşekkür ederiz! 💕');
    closePage();
}

// Kapatma butonu dışında tıklanırsa modal kapatılsın
window.onclick = function(event) {
    const modal = document.getElementById('pageModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Countdown'ı güncelle
setInterval(updateCountdown, 1000);