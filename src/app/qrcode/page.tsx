'use client'
import { Box, Button, Card, Text } from '@radix-ui/themes'

import { FileTextIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { PIX } from 'gpix/dist'
import { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '@/firebase'
import { Skeleton } from '@/components/ui/Skelleton'

interface DataState {
  status?: string
  receiverName?: string
  receiverCity?: string
  pixKey?: string
  description?: string
  isUniqueTransaction?: boolean
  amount?: string
  brcode?: string
}

export default function QrCode() {
  const [data, setData] = useState<DataState>({
    status: 'loading',
    receiverName: '',
    receiverCity: '',
    pixKey: '',
    description: '',
    isUniqueTransaction: true,
    amount: '',
  })
  const router = useRouter()
  const ownerCollection = collection(db, 'owner')
  const usersCollection = collection(db, 'users')

  const handleRedirect = () => {
    router.push('/dashboard')
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ownerQuerySnapshot = await getDocs(query(ownerCollection))
        const userQuerySnapshot = await getDocs(query(usersCollection))

        let combinedData = { ...data }

        userQuerySnapshot.forEach((doc) => {
          combinedData = {
            ...combinedData,
            status: 'success',
            description: doc.data().description,
            amount: doc.data().value,
          }
        })

        ownerQuerySnapshot.forEach((doc) => {
          combinedData = {
            ...combinedData,
            receiverName: doc.data().name,
            receiverCity: doc.data().city,
            pixKey: doc.data().pixKey,
          }
        })

        setData(combinedData)
      } catch (error) {
        console.error('Erro ao buscar dados:', error)
      }
    }

    fetchData()
  }, [])

  const pix = PIX.static()
    .setReceiverName(data.receiverName || '')
    .setReceiverCity(data.receiverCity || '')
    .setKey(data.pixKey || '')
    .setDescription(data.description || '')
    .isUniqueTransaction(data.isUniqueTransaction || true)
    .setAmount(Number(data.amount) || 0)

  return (
    <div className="flex items-center justify-center h-screen">
      {data.status === 'success' ? (
        <Box className="flex items-center justify-center flex-col max-w-2xl w-[440px] h-[660px] border border-gray-400 rounded-3xl">
          <Image alt="wallet icon" height="64" src="pix-hand.svg" width="64" />
          <Box className="mt-2 max-w-sm">
            <div className="flex justify-between">
              <Text weight="bold">VALOR TOTAL</Text>
              <Text className="ml-48" as="span">
                {`${data.amount}` || ''}
              </Text>
            </div>
            <Text mt="1" weight="bold">
              DESCRIÇÃO
            </Text>
            <Text as="span" className="block max-w-lg truncate">
              {data.description || ''}
            </Text>
          </Box>

          <Card mt="4" size="4">
            <Image
              alt="QRCODE"
              height={300}
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${pix.getBRCode()}`}
              width={300}
            />
          </Card>
          <Button
            className="bg-gray-900 hover:cursor-pointer hover:bg-gray-950 hover:transition-all"
            mt="5"
            onClick={handleRedirect}
            radius="large"
          >
            Crie outro QRCODE
          </Button>
          <Button
            disabled={true}
            className="hover:cursor-pointer"
            color="gray"
            mt="5"
            radius="large"
          >
            <FileTextIcon /> Imprimir
          </Button>
        </Box>
      ) : null}

      {data.status === 'loading' ? (
        <>
          <Skeleton className="w-[400px] h-[400px]" />
        </>
      ) : null}
    </div>
  )
}
