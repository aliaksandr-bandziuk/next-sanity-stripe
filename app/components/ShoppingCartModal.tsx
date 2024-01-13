'use client'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";

const ShoppingCartModal = () => {

  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout
  } = useShoppingCart();

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        console.log("result");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
      {/* <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger> */}
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 flex-col overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {
                cartCount === 0 ? (
                  <h3 className="py-6">Your cart is empty</h3>
                ) : (
                  <>
                    {Object.values(cartDetails ?? {}).map((entry) => (
                      <li key={entry.id} className="py-6 flex ">
                        <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                          <Image
                            src={entry.image as string}
                            alt={entry.name}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{entry.name}</h3>
                              <p className="ml-4">${entry.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-3">{entry.description}</p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">Qty {entry.quantity}</p>
                            <div className="flex">
                              <button
                                onClick={() => removeItem(entry.id)}
                                type="button"
                                className="font-medium text-primary hover:text-primary/80">
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                )
              }
            </ul>
          </div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-mmedium text-gray-900">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes are calculated at checkout</p>
            <div className="mt-6">
              {/* <Link href="/checkout"> */}
              <Button onClick={handleCheckoutClick} className="w-full">
                Checkout
              </Button>
              {/* </Link> */}
            </div>
            <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
              <button
                onClick={() => handleCartClick()}
                className="font-medium text-primary hover:text-primary/80"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default ShoppingCartModal