// src/components/CreateProduct.tsx
import React, { useState } from 'react';
import styles from './AllProduct.module.css';
import { useAppDispatch } from '../state/hook';
import { addProduct, Product } from '../state/productSlice';
import { useNavigate } from 'react-router-dom';


const CreateProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Состояние формы
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [image, setImage] = useState(''); // Добавим поле для изображения

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация (опционально)
    if (!title || !price || !description || !category || !rating || !image) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Генерация уникального ID (можно использовать библиотеку, например, uuid)
    // Здесь для простоты возьмем максимальный текущий ID + 1
    // Предполагается, что у вас уже загружены продукты
    // В противном случае, можно использовать timestamp или другую логику
    const newId = Date.now(); // Используем timestamp для уникальности

    const newProduct: Product = {
      id: newId,
      title,
      price,
      description,
      category,
      image, // URL изображения
      rating: {
        rate: rating,
        count: 0, // Начальное количество отзывов
      },
    };

    // Диспатчим действие для добавления продукта
    dispatch(addProduct(newProduct));

    // Очистка формы (опционально)
    setTitle('');
    setPrice(0);
    setDescription('');
    setCategory('');
    setRating(0);
    setImage('');

    // Перенаправление на страницу со списком продуктов
    navigate('/');
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Введите название"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Введите цену"
          className={styles.input}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
          min="0"
          step="0.01"
        />
        <input
          type="text"
          placeholder="Введите описание"
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Введите категорию"
          className={styles.input}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Введите рейтинг"
          className={styles.input}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
          min="0"
          max="5"
          step="0.1"
        />
        <input
          type="text"
          placeholder="Введите URL изображения"
          className={styles.input}
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Создать!
        </button>
      </form>
      <button
        className={styles.btn2}
        onClick={() => navigate(-1)} // Навигация назад
      >

        Вернуться назад
      </button>
    </div>
  );
};

export default CreateProduct;

