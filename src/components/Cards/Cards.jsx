import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Cards.module.scss';

import { Card, EmptyPage } from '../'

export const Cards = ({data, forWishlist}) => {

  const wishlist = useSelector(state => state.cart.wishList)

  return data.length > 0 ? (
    <div className={styles.cardList}>
      {data.map((item, i) => {
        let wishListed = false;
        wishlist.forEach(wishListItem => {
          wishListed = wishListItem.id === item.id;
        });

        return <Card {...item} wishListed={wishListed} forWishlist={forWishlist} key={item.id }/>
      })}
    </div>
  ) : <EmptyPage name="No data found" />
}