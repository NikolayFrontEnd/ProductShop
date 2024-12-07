import { Link } from "react-router-dom";
import styles from './AllProduct.module.css'
import React from 'react';
const Change: React.FC =  () =>{
    return(
        <>

    <h1>
Страница пока не работает! Вы не можете изменять карточки с товарами!
 <Link to = "/ProductShop">     <button className = {styles.btn2}>
   ВЕРНУТЬСЯ! 
</button> </Link>
    </h1>

        </>
    )
}

export default Change;