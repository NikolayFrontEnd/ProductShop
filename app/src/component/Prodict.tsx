import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../state/hook';
import { fetchProducts } from '../state/productSlice';
import styles from './AllProduct.module.css'; // Путь к вашим стилям

const ProductItem: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем параметр id из URL
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const loading = useAppSelector((state) => state.products.loading);
  const error = useAppSelector((state) => state.products.error);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  // Преобразуем id из строки в число
  const productId = parseInt(id || '', 10);
  const currentProduct = products.find((p) => p.id === productId);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!currentProduct) {
    return <div>Продукт не найден</div>;
  }

  return (
    <div>     
      <h1 >Более подробная информация об этом товаре:</h1>
    <div className={styles.block}>
      <img src={currentProduct.image} alt={currentProduct.title} className={styles.img}/>
      <div className={styles.content}>
        <h2>{currentProduct.title}</h2>
        <p><strong>Цена:</strong> ${currentProduct.price}</p>
        <p><strong>Описание:</strong> {currentProduct.description}</p>
        <p><strong>Категория:</strong> {currentProduct.category}</p>
        <p>
          <strong>Рейтинг:</strong> {currentProduct.rating.rate} ({currentProduct.rating.count} отзывов)
        </p>
{/*         <button className={styles.btn}>Добавить в корзину</button> */}
      </div>
 
    </div>

<Link to = "/ProductShop">     <button className = {styles.btn2}>
ВЕРНУТЬСЯ! 
</button> </Link>
</div>

  );
};

export default ProductItem;