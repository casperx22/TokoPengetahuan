document.addEventListener('DOMContentLoaded', () => {
    // 1. DATA APLIKASI
    let userCoins = 50;
    let inventory = [];

    const shopItems = [
        { id: 'S001', name: 'Rak Buku', price: 20, icon: '📚' },
        { id: 'S002', name: 'Teleskop Mini', price: 45, icon: '🔭' },
        { id: 'S003', name: 'Globe Dunia', price: 15, icon: '🌍' },
        { id: 'S004', name: 'Papan Tulis', price: 30, icon: '📝' }
    ];

    // 2. REFERENSI ELEMEN HTML
    const coinCountElement = document.getElementById('coin-count');
    const shopItemsContainer = document.getElementById('shop-items');
    const inventoryDisplay = document.getElementById('inventory-display');
    const addCoinBtn = document.getElementById('add-coin-btn');

    // 3. FUNGSI UTAMA

    // Fungsi Update Koin di Tampilan
    function updateCoinDisplay() {
        coinCountElement.textContent = userCoins;
    }

    // Fungsi Render Toko
    function renderShop() {
        shopItemsContainer.innerHTML = '';
        shopItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <div style="font-size: 40px;">${item.icon}</div>
                <strong>${item.name}</strong>
                <p>💰 ${item.price}</p>
                <button class="buy-button" data-id="${item.id}" data-price="${item.price}" data-name="${item.name}">
                    Beli
                </button>
            `;
            shopItemsContainer.appendChild(card);
        });
        
        // Pasang event listener setelah item dimuat
        document.querySelectorAll('.buy-button').forEach(button => {
            button.addEventListener('click', handlePurchase);
            // Perbarui status tombol secara visual
            if (userCoins < parseInt(button.dataset.price)) {
                button.classList.add('disabled');
            } else {
                button.classList.remove('disabled');
            }
        });
    }

    // Fungsi Render Inventaris
    function renderInventory() {
        inventoryDisplay.innerHTML = '';
        inventory.forEach(item => {
            const inventoryItem = document.createElement('div');
            inventoryItem.className = 'item-card inventory-item';
            // Tambahkan atribut agar bisa di-drag
            inventoryItem.setAttribute('draggable', true);
            inventoryItem.innerHTML = `<div style="font-size: 40px;">${item.icon}</div><strong>${item.name}</strong>`;
            inventoryDisplay.appendChild(inventoryItem);
            
            // Logika Drag-and-Drop (UX Kunci)
            // (Kode dragstart, dragover, drop untuk memindah item ke Area Rumah perlu ditambahkan di sini)
        });
    }
    
    // Fungsi Pembelian
    function handlePurchase(event) {
        const button = event.target;
        const itemId = button.dataset.id;
        const itemPrice = parseInt(button.dataset.price);
        const itemName = button.dataset.name;

        if (userCoins >= itemPrice) {
            userCoins -= itemPrice;
            
            // Cari detail item yang dibeli
            const purchasedItem = shopItems.find(i => i.id === itemId);
            inventory.push(purchasedItem); // Tambahkan ke inventaris
            
            alert(`🎉 Berhasil membeli ${itemName}! Koinmu sisa ${userCoins}.`); // Feedback sukses
            
            updateCoinDisplay();
            renderShop(); // Perbarui toko (tombol disable)
            renderInventory(); // Perbarui inventaris
        } else {
            alert(`Ops! Koinmu (${userCoins}) tidak cukup untuk membeli ${itemName} (Butuh ${itemPrice}).`); // Feedback gagal
            button.classList.add('disabled'); // Pastikan tombol non-aktif
        }
    }

    // Event untuk Simulasi Mendapatkan Koin (Dari menyelesaikan Kuis)
    addCoinBtn.addEventListener('click', () => {
        const reward = 10;
        userCoins += reward;
        
        // Animasi (Contoh UX Keren): Tombol berkedip hijau
        addCoinBtn.style.backgroundColor = 'lightgreen';
        setTimeout(() => addCoinBtn.style.backgroundColor = '#FFC107';, 300);
        
        updateCoinDisplay();
        renderShop(); // Perbarui toko agar tombol pembelian yang sebelumnya non-aktif bisa aktif
    });

    // 4. INISIALISASI
    updateCoinDisplay();
    renderShop();
});
