import { Card, Button } from "react-bootstrap";
import { useShopingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../util/formatCurrency";

type storeItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: storeItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShopingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>

                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromCart(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
