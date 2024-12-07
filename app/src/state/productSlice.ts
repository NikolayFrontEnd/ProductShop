// src/state/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Определение типов данных
interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

// Определение состояния слайса
interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Инициализация начального состояния
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Асинхронный thunk для получения продуктов
export const fetchProducts = createAsyncThunk<Product[]>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products/');
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      // Возвращаем ошибку для обработки в редюсере
      return rejectWithValue(err.message || 'Ошибка при загрузке данных');
    }
  }
);

// Создание слайса
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Добавляем действие для удаления продукта
    removeProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    // Добавляем действие для добавления продукта
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    // (Опционально) Добавление действия для редактирования продукта
    // editProduct: (state, action: PayloadAction<Product>) => {
    //   const index = state.products.findIndex(p => p.id === action.payload.id);
    //   if (index !== -1) {
    //     state.products[index] = action.payload;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Экспорт действий и редьюсера слайса
export const { removeProduct, addProduct } = productsSlice.actions;
export default productsSlice.reducer
