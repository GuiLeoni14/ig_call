import { Heading, Text } from '@ignite-ui/react'
import Image from 'next/image'
import previewImage from '../../assets/app-preview.png'
import { ClaimUsernameForm } from './components/ClaimUsernameForm'
import * as S from './styles'
export default function Home() {
  return (
    <S.Container>
      <S.Hero>
        <Heading size="4xl">Agendamento descomplicado</Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
        <ClaimUsernameForm />
      </S.Hero>
      <S.Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendário"
        />
      </S.Preview>
    </S.Container>
  )
}
