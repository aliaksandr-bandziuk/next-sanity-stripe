import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `
    *[_type == "product" && slug.current == "${slug}"][0] {
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        price_id
    }
  `;

  const data = await client.fetch(query);

  return data;

}

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export default async function ProductPage({
    params,
  }: {
    params: { slug: string };
  }) {

  const data: fullProduct = await getData(params.slug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {data.name}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <Button className="rounded-full gap-x-2">
                <span className="text-sm">4.2</span>
                <Star className="h-4 w-4" />
              </Button>
              <span className="text-gray-500 text-sm transition duration-100">
                (56 reviews)
              </span>
            </div>
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-xl md:text-2xl font-bold text-gray-800">
                  ${data.price}
                </span>
                <span className="mb-0.5 text-red-500 line-through">${data.price + 30}</span>
              </div>
              <span className="text-gray-500 text-sm">Free shipping</span>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="h-6 w-6" />
              <span className="text-sm">Ships within 2 days</span>
            </div>
            <div className="flex gap-2.5">
              <AddToBag
                key={data._id}
                name={data.name}
                description={data.description}
                price={data.price}
                currency="USD"
                image={data.images[0]}
                price_id={data.price_id}
              />
              <CheckoutNow
                name={data.name}
                description={data.description}
                price={data.price}
                currency="USD"
                image={data.images[0]}
                price_id={data.price_id}
              />
              {/* <Button className="w-1/2" variant="outline">
                Checkout now
              </Button> */}
            </div>
            <p className="mt-12 text-base text-gray-500 tracking-wide">{data.description}</p>
          </div>
        </div>
      </div>
    </div>
  )

}