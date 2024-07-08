document.addEventListener('DOMContentLoaded', () => {
    const addCardBtn = document.getElementById('add-card');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const cardContainer = document.getElementById('card-container');
    let cards = JSON.parse(localStorage.getItem('cards')) || [];

    const cardLinks = {
        'Blum': 'https://t.me/BlumCryptoBot/app?startapp=ref_92XEhjXjDC',
        'Hamster': 'https://t.me/hamstEr_kombat_bot/start?startapp=kentId1138846529',
        'BeeTon': 'https://t.me/beetongamebot/beeton?startapp=cwHk3vcSqZfmgp',
        'Fuel': 'https://t.me/fueljetton_bot/app?startapp=1693155529',
        'OrbitonX': 'https://t.me/orbitonx_bot/orbitonx?startapp=friendId1693155529',
        'Arbuz': 'https://t.me/wmclick_bot/click?startapp=ref_Ed3ZdIvN',
        'Catizen': 'https://t.me/catizenbot/gameapp?startapp=r_1312_3449363',
        'Cubes': 'https://t.me/cubesonthewater_bot?start=MTY5MzE1NTUyOQ==',
        'Iceberg': 'https://t.me/IcebergAppBot?start=referral_1693155529',
        'Pixelverse': 'https://t.me/pixelversexyzbot?start=1693155529',
        'DropHunter': 'https://t.me/drophuntergames_bot?start=BDY5tejMqN',
        'MemeFi': 'https://t.me/memefi_coin_bot?start=r_ffe31154f2',
        'Water': 'https://t.me/wateronbscbot/app?startapp=1693155529',
        'Dotcoin': 'https://t.me/dotcoin_bot?start=r_1693155529',
        'Vertus': 'https://t.me/vertus_app_bot/app?startapp=1693155529',
        'BullRun': 'https://t.me/BullApp_bot?start=1693155529_2263',
        'Topcoin': 'https://t.me/topcoin_me_bot?start=r_1693155529',
        'TONStation': 'https://t.me/tonstationgames_bot/app?startapp=ref_r6qqnld6xr56awf83dsflm',
        'Diamore': 'https://t.me/DiamoreCryptoBot/app?startapp=1693155529',
        'TimeFarm': 'https://t.me/TimeFarmCryptoBot?start=1ofPB2M30T0KUak0O'
    };

    addCardBtn.onclick = function() {
        modal.style.display = "block";
    }

    closeModal.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    window.addCard = function(cardName) {
        if (cards.includes(cardName)) {
            alert('Card already exists!');
            return;
        }

        cards.push(cardName);
        localStorage.setItem('cards', JSON.stringify(cards));

        const card = document.createElement('div');
        card.className = 'card';
        card.id = `${cardName.toLowerCase()}-card`;

        const link = document.createElement('a');
        link.href = cardLinks[cardName];
        link.target = "_blank";

        const icon = document.createElement('div');
        icon.className = 'icon';
        icon.id = `${cardName.toLowerCase()}-icon`;

        const nameWrapper = document.createElement('div');
        nameWrapper.className = 'wrapper';

        const name = document.createElement('div');
        name.className = 'name';
        name.innerHTML = `<pre>${cardName}</pre>`;

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = (e) => {
            e.preventDefault();
            card.remove();
            cards = cards.filter(c => c !== cardName);
            localStorage.setItem('cards', JSON.stringify(cards));
        };

        nameWrapper.appendChild(name);
        link.appendChild(icon);
        link.appendChild(nameWrapper);
        link.appendChild(deleteBtn);
        card.appendChild(link);

        cardContainer.insertBefore(card, addCardBtn);

        modal.style.display = "none";
    }

    function loadCards() {
        cards.forEach(cardName => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = `${cardName.toLowerCase()}-card`;

            const link = document.createElement('a');
            link.href = cardLinks[cardName];
            link.target = "_blank";

            const icon = document.createElement('div');
            icon.className = 'icon';
            icon.id = `${cardName.toLowerCase()}-icon`;

            const nameWrapper = document.createElement('div');
            nameWrapper.className = 'wrapper';

            const name = document.createElement('div');
            name.className = 'name';
            name.innerHTML = `<pre>${cardName}</pre>`;

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = (e) => {
                e.preventDefault();
                card.remove();
                cards = cards.filter(c => c !== cardName);
                localStorage.setItem('cards', JSON.stringify(cards));
            };

            nameWrapper.appendChild(name);
            link.appendChild(icon);
            link.appendChild(nameWrapper);
            link.appendChild(deleteBtn);
            card.appendChild(link);

            cardContainer.insertBefore(card, addCardBtn);
        });
    }

    loadCards();
});