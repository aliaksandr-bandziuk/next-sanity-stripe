'use client';
import { Button } from '@/components/ui/button'
import { useShoppingCart } from 'use-shopping-cart';
import { urlFor } from '../sanity';
import { ProduceCart } from './AddToBag';

const CheckoutNow = ({
  name,
  description,
  price,
  currency,
  image,
  price_id
}: ProduceCart) => {

  const { checkoutSingleItem } = useShoppingCart();

  const byuNow = (priceId: string) => {
    checkoutSingleItem(priceId);
  }

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
        byuNow(product.price_id);
      }}
      className="flex-1"
    >
      Add to Bag
    </Button>
  )
}

export default CheckoutNow