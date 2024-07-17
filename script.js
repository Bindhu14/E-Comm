document.addEventListener('DOMContentLoaded', () => {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            data.categories.forEach(category => {
                displayProducts(category.category_name, category.category_products);
            });
        });

    window.openCategory = (categoryName) => {
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.style.display = 'none');
        
        document.getElementById(categoryName).style.display = 'flex';
    };
});

const displayProducts = (category, products) => {
    const container = document.getElementById(category);
    products.forEach(product => {
        const discount = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
        const maxLength = 10; 
        const truncatedTitle = product.title.length > maxLength ? product.title.substring(0, maxLength) + '...' : product.title;
        
        const productCard = `
            <div class="product-card">
                ${product.badge_text ? `<div class="product-badge">${product.badge_text}</div>` : ''}
                <img src="${product.image}" alt="${product.title}">
                <div class="product-details">
                    <h3 class="product-title">${truncatedTitle}</h3>
                    <p class="product-vendor">${product.vendor}</p>
                </div>
                <div class="price-details">
                    <p class="product-price">Rs ${product.price}</p>
                    <p class="compare-at-price">${product.compare_at_price}</p>
                    <p class="product-discount">${discount}% off</p>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        
        container.innerHTML += productCard;
    });
};
