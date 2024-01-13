import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

export default function SuccessStripe() {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w[50vw] mx-auto">
        <CheckCheck className="h-16 w-16 text-green-500 mx-auto my-6" />
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Payment Successful</h2>
          <p className="text-gray-500 text-center">Thank you for your purchase!</p>
          <Button
            asChild
            className="mt-8"
          >
            <Link href="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}