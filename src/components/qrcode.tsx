/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/DDrycublyGW
 */
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/Card'
import { Button } from '@radix-ui/themes'
import { SVGProps } from 'react'

export function Qrcode() {
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-col items-center space-y-1">
        <XIcon className="w-6 h-6 mb-1" />
        <CardTitle className="text-center">Customer Name</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4 p-4">
        <p className="text-lg font-normal text-gray-600 leading-relaxed">
          Product Description: This is a placeholder description for the
          product.
        </p>
        <img
          alt="QR Code"
          aria-label="QR Code"
          className="w-64 h-64"
          src="/placeholder.svg"
        />
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4 p-4">
        <Button className="bg-black text-white w-2/3 text-center">
          Create Another QR Code
        </Button>
        <Button className="flex flex-row items-center space-x-2 bg-gray-500 text-white w-2/3 mt-4 text-center">
          <PrinterIcon className="w-4 h-4" />
          <span>Print</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function PrinterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect width="12" height="8" x="6" y="14" />
    </svg>
  )
}