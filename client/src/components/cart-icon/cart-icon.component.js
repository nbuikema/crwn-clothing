import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

const CartIcon = () => {
    const itemCount = useSelector(state => selectCartItemsCount(state));
    const dispatch = useDispatch();
    const dispatchCartHidden = () => dispatch(toggleCartHidden());

    return (
        <div onClick={ dispatchCartHidden } className='cart-icon'>
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{ itemCount }</span>
        </div>
    );
};
 
export default CartIcon;

/*
const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div onClick={ toggleCartHidden } className='cart-icon'>
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{ itemCount }</span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
*/