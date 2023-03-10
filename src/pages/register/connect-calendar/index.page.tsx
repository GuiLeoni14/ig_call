import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, Check } from 'phosphor-react'
import * as S from './styles'

export default function Register() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  const handleConnectCalendar = async () => {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }
  console.log(session)
  return (
    <S.Container>
      <S.Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.{' '}
        </Text>
        <MultiStep size={4} currentStep={2} />
      </S.Header>
      <S.ConnectBox>
        <S.ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </S.ConnectItem>
        {hasAuthError && (
          <S.AuthError size="sm">
            Falha ao se conectar ao google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </S.AuthError>
        )}
        <Button
          type="submit"
          onClick={handleNavigateToNextStep}
          disabled={!isSignedIn}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </S.ConnectBox>
    </S.Container>
  )
}
