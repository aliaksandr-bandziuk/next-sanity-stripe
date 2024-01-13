'use client';
import { Button } from '@/components/ui/button'
import { useShoppingCart } from 'use-shopping-cart';
import { urlFor } from '../sanity';

export interface ProduceCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
}

const AddToBag = ({
  name,
  description,
  price,
  currency,
  image,
  price_id
}: ProduceCart) => {

  const { addItem, handleCartClick } = useShoppingCart();

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: urlFor(image).url(),
    price_id: price_id
  }

  return (
    <Button
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
      className="flex-1"
    >
      Add to Bag
    </Button>
  )
}

export default AddToBag