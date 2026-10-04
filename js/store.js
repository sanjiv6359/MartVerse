/**
 * Store logic for products.html and product-details.html
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('products-grid');
    const resultsCount = document.getElementById('results-count');

    if (grid && typeof products !== 'undefined') {
        renderProducts(products);

        // Setup filters
        const categoryFilters = document.querySelectorAll('#category-filters li');
        const searchInput = document.getElementById('search-input');
        const priceRange = document.getElementById('price-range');
        const priceDisplay = document.getElementById('price-display');
        const sortSelect = document.getElementById('sort-select');

        let currentCategory = 'all';
        let currentSearch = '';
        let currentMaxPrice = 2000;
        let currentSort = 'popular';

        // Event Listeners for Filters
        if (categoryFilters) {
            categoryFilters.forEach(li => {
                li.addEventListener('click', (e) => {
                    categoryFilters.forEach(el => el.style.color = 'var(--text-secondary)');
                    e.target.style.color = 'var(--electric-blue)';
                    currentCategory = e.target.getAttribute('data-category');
                    filterAndRender();
                });
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                currentSearch = e.target.value.toLowerCase();
                filterAndRender();
            });
        }

        if (priceRange) {
            priceRange.addEventListener('input', (e) => {
                currentMaxPrice = e.target.value;
                priceDisplay.textContent = `$${currentMaxPrice}`;
                filterAndRender();
            });
        }

        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                filterAndRender();
            });
        }

        function filterAndRender() {
            let filtered = products.filter(p => {
                const matchCat = currentCategory === 'all' || p.category.toLowerCase() === currentCategory.toLowerCase();
                const matchSearch = p.name.toLowerCase().includes(currentSearch);
                const matchPrice = p.price <= currentMaxPrice;
                return matchCat && matchSearch && matchPrice;
            });

            if (currentSort === 'price-low') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (currentSort === 'price-high') {
                filtered.sort((a, b) => b.price - a.price);
            } else {
                // popular (default mock sort by rating)
                filtered.sort((a, b) => b.rating - a.rating);
            }

            renderProducts(filtered);
        }
    }
});

function renderProducts(items) {
    const grid = document.getElementById('products-grid');
    const resultsCount = document.getElementById('results-count');
    if (!grid) return;

    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = '<p style="color: var(--text-muted); grid-column: 1/-1;">No products found matching your criteria.</p>';
        if (resultsCount) resultsCount.textContent = 'Showing 0 results';
        return;
    }

    if (resultsCount) resultsCount.textContent = `Showing ${items.length} results`;

    items.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card glass-card';
        card.innerHTML = `
            ${p.price > 1000 ? '<span class="discount-badge" style="background: var(--electric-blue);">Premium</span>' : ''}
            <a href="product-details.html?id=${p.id}" class="product-img-wrapper">
                <img src="${p.image}" alt="${p.name}" class="product-img">
            </a>
            <a href="product-details.html?id=${p.id}"><h3 class="product-title">${p.name}</h3></a>
            <div class="rating"><i class="fa-solid fa-star"></i> ${p.rating}</div>
            <div class="product-price">$${p.price.toFixed(2)}</div>
            <button class="btn btn-primary" style="width: 100%; border-radius: 8px;" onclick="addToCart({id: ${p.id}, name: '${p.name.replace(/'/g, "\\'")}', price: ${p.price}, image: '${p.image}'})">Add to Cart</button>
        `;
        grid.appendChild(card);
    });
}
