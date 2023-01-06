import { Button, TextInput } from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import * as S from './styles'

const claimUsernameFormSchema = z.object({
  username: z.string(),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export function ClaimUsernameForm() {
  const { register, handleSubmit } = useForm<ClaimUsernameFormData>()

  const handleCaimUsername = async (data: ClaimUsernameFormData) => {
    console.log(data)
  }

  return (
    <S.Form as="form" onSubmit={handleSubmit(handleCaimUsername)}>
      <TextInput
        size="sm"
        prefix="domínio.com/"
        placeholder="seu usuário"
        {...register('username')}
      />
      <Button size="sm" type="submit">
        Reservar
        <ArrowRight />
      </Button>
    </S.Form>
  )
}
