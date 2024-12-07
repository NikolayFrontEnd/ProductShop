import { useEffect, useState } from 'react';
import styles from './AllProduct.module.css';
import { useAppDispatch, useAppSelector } from '../state/hook';
import { fetchProducts, Product, removeProduct } from '../state/productSlice';
import { Link } from 'react-router-dom';
import { addFavorite, removeFavorite } from "../state/favoritesSlice"
function AllProducts() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);
  const favorites = useAppSelector((state) => state.favorites.favorites);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const handleAddFavorite = (product: Product) => {
    dispatch(addFavorite(product));
  };
  const handleRemoveFavorite = (id: number) => {
    dispatch(removeFavorite(id));
  };
  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (products.length === 0) {
    return <div>Продукты не найдены</div>;
  }

  
  const handleDeleteProduct = (id: number) => {
    dispatch(removeProduct(id));

    dispatch(removeFavorite(id));
  };
  const isFavorite = (id: number) => favorites.some(p => p.id === id);
  return (
    <div className={styles.container}>
      <div className = {styles.header}>
<Link to = "/favourite">        <div className = {styles.headerItem}>Избранное</div>   </Link>
<Link to = "/create">      <div className = {styles.headerItem}>Создать</div>  </Link>
      </div>
            {products.map((product: Product) => (
             <Link key={product.id} to={`/product/${product.id}`}>    <div key={product.id} className={styles.block}>
                    <img src={product.image} alt={product.title} className={styles.img} />

                    <div className={styles.content}>
                        <h2>{product.title}</h2>
                        <p><strong>Цена:</strong> ${product.price}</p>
                        <p><strong>Описание:</strong> {product.description}</p>
                        <p><strong>Категория:</strong> {product.category}</p>
                        <p>
                            <strong>Рейтинг:</strong> {product.rating.rate} ({product.rating.count} отзывов)
                        </p>
                        <div className={styles.icons}>
                        <button 
            className={`${styles.btn} ${isFavorite(product.id) ? styles.favorited : ''}`}
                  onClick={(e) => {
                    e.preventDefault(); 
                    if (isFavorite(product.id)) {
                      handleRemoveFavorite(product.id);
                    } else {
                      handleAddFavorite(product);
                    }
                  }}
                >
                  {isFavorite(product.id) ? 'В избранном' : 'Нравится!'}
                </button>
                <img 
              src="/delete.png" 
              alt="Удалить" 
              className={styles.icon} 
              onClick={(e) => {
                e.preventDefault(); // Предотвращаем переход по ссылке
                handleDeleteProduct(product.id);
              }} 

            />
                       <Link to = "/refine">       <img src="/pen.png" alt="Редактировать" className={styles.icon} />    </Link>  
                        </div>
                    </div>
                </div>   </Link>
            ))}
        </div>
  );
}
export default AllProducts;