import { Button } from './ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/Card'
import { Avatar, Flex, Text } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'

interface CardProps {
  add?: boolean
  update?: boolean
  create?: boolean
}

type InfoType = {
  title: string
  description: string
  buttonText: string
  avatarSvg: string
}

type InfoObjectType = {
  add: InfoType
  create: InfoType
  update: InfoType
}

export function ContentCard({ add, create, update }: CardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push('/add')
  }

  const info: InfoObjectType = {
    add: {
      title: 'Adicione suas credenciais',
      description: 'Cadastre suas informações para utilizar o serviço',
      buttonText: 'Adicionar',
      avatarSvg: './pix.svg',
    },
    update: {
      title: 'Atualize suas credenciais',
      description: 'Caso você queira, você pode atualizar suas credenciais',
      buttonText: 'Atualizar',
      avatarSvg: './pix.svg',
    },
    create: {
      title: 'Crie um QRCODE',
      description: 'Cadastre rapidamente um QRCODE pix',
      buttonText: 'Adicionar',
      avatarSvg: './pix-hand.svg',
    },
  }

  const renderCard = ({
    title,
    description,
    buttonText,
    avatarSvg,
  }: InfoType) => (
    <Card className="hover:border hover:border-black hover:transition-all">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-4">
          <Flex className="flex items-center space-x-4">
            <Avatar size="4" src={avatarSvg} fallback="D" />
            <div className="flex flex-col">
              <Text className="text-sm font-medium leading-none">
                É rápido e prático
              </Text>
              <Text className="text-sm text-muted-foreground">
                Sem burocracias
              </Text>
            </div>
          </Flex>
          <Button
            onClick={handleClick}
            className="hover:bg-gray-300 hover:transition-all"
            variant="secondary"
          >
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <>
      {create
        ? renderCard({
            title: info.create.title,
            description: info.create.description,
            buttonText: info.create.buttonText,
            avatarSvg: info.create.avatarSvg,
          })
        : null}
      {add
        ? renderCard({
            title: info.add.title,
            description: info.add.description,
            buttonText: info.add.buttonText,
            avatarSvg: info.add.avatarSvg,
          })
        : null}
      {update
        ? renderCard({
            title: info.update.title,
            description: info.update.description,
            buttonText: info.update.buttonText,
            avatarSvg: info.update.avatarSvg,
          })
        : null}
    </>
  )
}