import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput
} from '@ignite-ui/react'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../../lib/axios'
import { convertTimeStringToMinutes } from '../../../utils/convert-time-string-in-minutes'
import { getWeekDays } from '../../../utils/get-week-days'
import * as S from './styles'

const weekDays = getWeekDays()

const timeIntervalsSchema = z.object({
  intervals: z
    .array(
      z.object({
        weekDay: z.number().min(0).max(6),
        enabled: z.boolean(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .length(7)
    .transform((intervals) => intervals.filter((interval) => interval.enabled))
    .refine((intervals) => intervals.length >= 1, {
      message: 'Você precisa selecionar pelo menos um dia da semana!',
    })
    .transform((intervals) => {
      return intervals.map((interval) => {
        return {
          weekDay: interval.weekDay,
          startTimeInMinutes: convertTimeStringToMinutes(interval.startTime),
          endTimeInMinutes: convertTimeStringToMinutes(interval.endTime),
        }
      })
    })
    .refine(
      (intervals) => {
        return intervals.every(
          (interval) =>
            interval.endTimeInMinutes - 60 >= interval.startTimeInMinutes,
        )
      },
      {
        message:
          'O horário de termino deve ser pelo menos 1 hora distante do início',
      },
    ),
})

type TimeIntervalsFormInput = z.input<typeof timeIntervalsSchema>
type TimeIntervalsFormOutput = z.output<typeof timeIntervalsSchema>

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TimeIntervalsFormInput>({
    resolver: zodResolver(timeIntervalsSchema),
    defaultValues: {
      intervals: [
        {
          weekDay: 0,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 1,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 2,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 3,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 4,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 5,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekDay: 6,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
      ],
    },
  })
  const { fields } = useFieldArray({
    name: 'intervals',
    control,
  })
  const router = useRouter()
  const intervals = watch('intervals') // retorna em tempo real as alterações

  const handleSetTimeIntervals = async (data: any) => {
    const formData = data as TimeIntervalsFormOutput
    await api.post('/users/time-intervals', formData)
    await router.push('/register/update-profile')
  }

  return (
    <S.Container>
      <S.Header>
        <Heading as="strong">Quase lá</Heading>
        <Text>
          Defina o intervalo de horários que você está disponível em cada dia da
          semana.
        </Text>
        <MultiStep size={4} currentStep={3} />
        <S.IntervalBox
          as="form"
          onSubmit={handleSubmit(handleSetTimeIntervals)}
        >
          <S.IntervalContainer>
            {fields.map((field, index) => {
              return (
                <S.IntervalItem key={field.id}>
                  <S.IntervalDay>
                    <Controller
                      name={`intervals.${index}.enabled`}
                      control={control}
                      render={({ field }) => {
                        return (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked === true)
                            }}
                          />
                        )
                      }}
                    />
                    <Text>{weekDays[field.weekDay]}</Text>
                  </S.IntervalDay>
                  <S.IntervalInputs>
                    <TextInput
                      size="sm"
                      type="time"
                      disabled={!intervals[index].enabled}
                      step={60}
                      {...register(`intervals.${index}.startTime`)}
                    />
                    <TextInput
                      size="sm"
                      type="time"
                      disabled={!intervals[index].enabled}
                      step={60}
                      {...register(`intervals.${index}.endTime`)}
                    />
                  </S.IntervalInputs>
                </S.IntervalItem>
              )
            })}
          </S.IntervalContainer>
          {errors.intervals && (
            <S.FormError size="sm">{errors.intervals.message}</S.FormError>
          )}
          <Button type="submit" disabled={isSubmitting}>
            Próximo passo
            <ArrowRight />
          </Button>
        </S.IntervalBox>
      </S.Header>
    </S.Container>
  )
}
