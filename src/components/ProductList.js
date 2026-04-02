import { useState, useEffect } from 'react';
import feedData from '../data';
import './ProductList.css';

function ProductList() {

  // This will store our products
  const [products, setProducts] = useState([]);

  // This tracks if data is still loading
  const [loading, setLoading] = useState(true);

  // useEffect runs automatically when the page loads
  useEffect(() => {

    // We fake a loading delay of 1.5 seconds
    // This simulates waiting for a real API response
    setTimeout(() => {
      setProducts(feedData);
      setLoading(false);
    }, 1500);

  }, []);

  return (
    <div className="product-section">
      <h2>🛒 Our Feed Products</h2>
      <p className="product-subtitle">
        Fetched from BSF-Nutrifeed product database
      </p>

      {/* SHOW LOADING MESSAGE WHILE DATA IS BEING FETCHED */}
      {loading ? (
        <div className="loading">
          ⏳ Loading products...
        </div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <span className="badge">{product.badge}</span>
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-details">
                <span>🧬 Protein: {product.protein}</span>
                <span>💰 {product.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default ProductList;