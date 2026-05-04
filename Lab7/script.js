window.loadCategories = async function() {
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    try {
        const response = await fetch('categories.json'); 
        if (!response.ok) throw new Error('Не вдалося завантажити categories.json');
        
        const categories = await response.json();
        
        let html = `
            <h2 class="text-center mb-5" style="color: #3e2723;">Наше Меню</h2>
            <div class="row row-cols-1 row-cols-md-3 g-4">`;
        
        categories.forEach(cat => {
            html += `
            <div class="col">
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body text-center d-flex flex-column">
                        <h4 class="card-title">${cat.name}</h4>
                        <p class="card-text text-muted small flex-grow-1">${cat.notes || "Lorem ipsum dolor sit amet."}</p>
                        <button class="btn btn-outline-dark mt-3" onclick="window.loadItems('${cat.shortname}')">Відкрити</button>
                    </div>
                </div>
            </div>`;
        });

        html += `
            <div class="col">
                <div class="card h-100 shadow-sm border-warning" style="background-color: #fffdf5;">
                    <div class="card-body text-center d-flex flex-column">
                        <h4 class="card-title text-warning">Specials</h4>
                        <p class="card-text small flex-grow-1">Ми оберемо напій або десерт для вас випадковим чином!</p>
                        <button class="btn btn-warning mt-3" onclick="window.loadRandomCategory()">Мені пощастить!</button>
                    </div>
                </div>
            </div>
        </div>`;
        
        mainContent.innerHTML = html;
        
    } catch (error) {
        mainContent.innerHTML = `<div class="alert alert-danger">Помилка: ${error.message}</div>`;
    }
};

window.loadItems = async function(shortname) {
    const mainContent = document.getElementById("main-content");
    if (!mainContent) return;

    try {
        const response = await fetch(`category_${shortname}.json`);
        if (!response.ok) throw new Error(`Файл category_${shortname}.json не знайдено`);
        
        const data = await response.json();

        let html = `
            <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <h2 style="color: #3e2723;">${data.category_name}</h2>
                <button class="btn btn-sm btn-secondary" onclick="window.loadCategories()">← Назад</button>
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">`;

        data.items.forEach(item => {
            const imagePath = item.image || "img/default-coffee.jpg";

            html += `
            <div class="col">
                <div class="card h-100 shadow-sm border-light">
                    <img src="${imagePath}" class="card-img-top" alt="${item.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title fw-bold">${item.name}</h5>
                        <p class="card-text text-muted small flex-grow-1">${item.description}</p>
                        <div class="mt-auto pt-3">
                            <span class="badge bg-success fs-6" style="background-color: #6d4c41 !important;">${item.price} грн</span>
                        </div>
                    </div>
                </div>
            </div>`;
        });

        html += '</div>';
        mainContent.innerHTML = html;

    } catch (error) {
        alert("Не вдалося завантажити товари: " + error.message);
    }
};

window.loadRandomCategory = async function() {
    try {
        const response = await fetch('categories.json');
        if (!response.ok) throw new Error('Помилка завантаження');
        
        const categories = await response.json();
        const randomIndex = Math.floor(Math.random() * categories.length);
        window.loadItems(categories[randomIndex].shortname);
    } catch (error) {
        console.error(error);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const catalogBtn = document.getElementById("load-catalog");
    if (catalogBtn) {
        catalogBtn.onclick = (e) => {
            e.preventDefault();
            window.loadCategories();
        };
    }
});