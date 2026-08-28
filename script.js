// База даних товарів
const productsData = [
    { id: 1, category: 'pizza', name: 'Пепероні Класік', desc: 'Пікантна пепероні, моцарела, фірмовий томатний соус.', price: 249, badge: 'ХІТ', img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80' },
    { id: 2, category: 'pizza', name: '4 Сири Преміум', desc: 'Моцарела, пармезан, дор блю, чеддер, вершковий соус.', price: 289, badge: 'ТОП', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80' },
    { id: 3, category: 'pizza', name: 'Гавайська PIGEON', desc: 'Ніжне куряче філе, ананаси, моцарела, соус.', price: 239, badge: 'АКЦІЯ', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=500&q=80' },
    { id: 4, category: 'pizza', name: 'М\'ясний Бум', desc: 'Шинка, бекон, баварські ковбаски, соус барбекю.', price: 299, badge: 'NEW', img: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=500&q=80' },
    { id: 5, category: 'sides', name: 'Курячі Крильця', desc: 'Соковиті крильця у пікантному соусі BBQ (8 шт).', price: 149, badge: '🔥', img: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=500&q=80' },
    { id: 6, category: 'sides', name: 'Картопля по-селянськи', desc: 'Запечена картопля з духмяними спеціями.', price: 89, badge: '', img: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=80' },
    { id: 7, category: 'sides', name: 'Нагетси Хрусткі', desc: 'Ніжне куряче філе у хрусткій паніровці (9 шт).', price: 119, badge: 'ДІТЯМ', img: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=500&q=80' },
    { id: 8, category: 'drinks', name: 'Coca-Cola 1.0 л', desc: 'Класична освіжаюча Coca-Cola.', price: 45, badge: '', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80' },
    { id: 9, category: 'drinks', name: 'Сік Мультифрукт 1 л', desc: 'Натуральний фруктовий сік.', price: 55, badge: '', img: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=500&q=80' },
    { id: 10, category: 'desserts', name: 'Шоколадний Фондан', desc: 'Традиційний десерт з рідкою шоколадною начинкою.', price: 99, badge: 'СОЛОДКЕ', img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=500&q=80' },
    { id: 11, category: 'sauces', name: 'Соус Часниковий', desc: 'Ароматний часниковий соус до бортиків.', price: 25, badge: '', img: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=500&q=80' },
    { id: 12, category: 'sauces', name: 'Соус Барбекю', desc: 'Класичний копчений соус BBQ.', price: 25, badge: '', img: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=500&q=80' }
];

let cart = [];
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

// Відображення товарів
function renderProducts(category = 'all') {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    const filtered = category === 'all' 
        ? productsData 
        : productsData.filter(p => p.category === category);

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
            <div class="card-img-wrap">
                <img src="${p.img}" alt="${p.name}" class="card-img">
            </div>
            <div class="card-content">
                <h4 class="card-title">${p.name}</h4>
                <p class="card-desc">${p.desc}</p>
                <div class="card-footer">
                    <span class="current-price">${p.price} грн</span>
                    <button class="add-to-cart-btn" onclick="addToCart(this, ${p.id})">В кошик</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Фільтрація за категоріями
function filterCategory(cat) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderProducts(cat);
}

// Додавання у кошик та анімація польоту
function addToCart(btnElement, productId) {
    const product = productsData.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    updateCartUI();

    // Анімація
    const card = btnElement.closest('.product-card');
    const img = card ? card.querySelector('.card-img') : null;
    const cartBtn = document.getElementById('cartBtn');

    if (img && cartBtn) {
        const imgRect = img.getBoundingClientRect();
        const cartRect = cartBtn.getBoundingClientRect();

        const flyImg = img.cloneNode();
        flyImg.classList.add('fly-item');
        flyImg.style.left = `${imgRect.left}px`;
        flyImg.style.top = `${imgRect.top}px`;
        flyImg.style.width = `${imgRect.width}px`;
        flyImg.style.height = `${imgRect.height}px`;

        document.body.appendChild(flyImg);

        requestAnimationFrame(() => {
            flyImg.style.left = `${cartRect.left + 10}px`;
            flyImg.style.top = `${cartRect.top + 10}px`;
            flyImg.style.width = '20px';
            flyImg.style.height = '20px';
            flyImg.style.opacity = '0';
        });

        setTimeout(() => flyImg.remove(), 800);
    }
}

// Швидке додавання з баннера
function quickAdd(name, price) {
    const item = productsData.find(p => p.name === name) || { id: Date.now(), name, price };
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    updateCartUI();
    openCartModal();
}

// Оновлення інтерфейсу кошика
function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    document.getElementById('cartCount').textContent = totalCount;
    document.getElementById('cartTotalPrice').textContent = `${totalPrice} грн`;

    const list = document.getElementById('cartItemsList');
    if (cart.length === 0) {
        list.innerHTML = '<p style="text-align:center; color:#888;">Кошик порожній 🛒</p>';
    } else {
        list.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${item.price * item.qty} грн</div>
                </div>
                <div class="cart-controls">
                    <button class="cart-btn-qty" onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button class="cart-btn-qty" onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `).join('');
    }
}

function changeQty(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }
    updateCartUI();
}

// Модальні вікна
function openCartModal() { document.getElementById('cartModal').classList.add('active'); }
function closeCartModal() { document.getElementById('cartModal').classList.remove('active'); }

function openModal(code) {
    document.getElementById('promoCodeVal').value = code;
    document.getElementById('promoModal').classList.add('active');
}
function closeModal() { document.getElementById('promoModal').classList.remove('active'); }

function copyAndClose() {
    const val = document.getElementById('promoCodeVal').value;
    navigator.clipboard.writeText(val);
    alert('Промокод ' + val + ' скопійовано!');
    closeModal();
}

function checkout() {
    if (cart.length === 0) {
        alert('Додайте товари в кошик!');
        return;
    }
    alert('Дякуємо за замовлення! Оператор зв’яжеться з вами найближчим часом.');
    cart = [];
    updateCartUI();
    closeCartModal();
}

// Слайдер
function setSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
}

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    setSlide(currentSlide);
}, 5000);

// Ініціалізація
document.getElementById('cartBtn').addEventListener('click', openCartModal);
renderProducts();
