import CartItemList from "../../components/CartItemList/CartItemList";
import useDocumentTitle from "../../helpers/useDocumentTitle";
import OrderSummary from "../../components/OrderSumarry/OrderSummary";
import { useCartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./Cart.css";
import { itemList } from "../../data/data";

const Cart = () => {
  useDocumentTitle("Carrito | García's Burgers");
  const { cartList, addToCart } = useCartContext();

  const addSuggestion = (item) => {
    addToCart({ ...item, quantity: 1 });
  };

  const suggestItem = () => {
    const max = itemList.length - 1;
    let randomNumber = Math.floor(Math.random() * (max + 1));
    let suggestedItem = itemList[randomNumber];
    return (
      <article>
        <div>
          <img src={suggestedItem.picURL} alt={`Imagen de ${suggestedItem.title}`} />
          <h3>{suggestedItem.title}</h3>
          <h4>${suggestedItem.price}</h4>
        </div>
        <Button text="Agregar al Carrito" click={() => addSuggestion(suggestedItem)} />
      </article>
    );
  };

  return (
    <section className="Cart">
      {cartList.length > 0 ? (
        <div className="cart-container">
          <CartItemList />
          <OrderSummary />
        </div>
      ) : (
        <div className="emptyOrder">
          <h1>¡Tu pedido está vacío!</h1>
          <h2>¿Qué estás esperando?</h2>
          <Link to="/menu">
            <Button text="Ver Menú" />
          </Link>
          <div className="suggestion">
            <h3>Probá esto...</h3>
            <div>{suggestItem()}</div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
