import React from 'react';
import styles from './AllProduct.module.css'; // Путь к вашим стилям
import { useAppDispatch, useAppSelector } from '../state/hook';
import { Link } from 'react-router-dom';
import { removeFavorite } from '../state/favoritesSlice';
const Favourite: React.FC = () => {
    const dispatch = useAppDispatch();
    const favorites = useAppSelector((state) => state.favorites.favorites);
  
    const handleRemoveFavorite = (id: number) => {
      dispatch(removeFavorite(id));
    };
  
    if (favorites.length === 0) {
      return <div>У вас пока нет избранных товаров.</div>;
    }
  
    return (
      <div className={styles.container}>
        <h1>Избранное</h1>
        {favorites.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <div className={styles.block}>
              <img src={product.image} alt={product.title} className={styles.img} />
              <div className={styles.content}>
                <h2>{product.title}</h2>
                <p><strong>Цена:</strong> ${product.price}</p>
                <button 
                  className={styles.removeBtn} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemoveFavorite(product.id);
                  }}
                >
                  Удалить из избранного
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };
  

export default Favourite;