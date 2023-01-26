import {
  Button,
  Checkbox,
  Heading,
  MultiStep,
  Text,
  TextInput
} from '@ignite-ui/react'
import { ArrowRight } from 'phosphor-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { getWeekDays } from '../../../utils/get-week-days'
import * as S from './styles'

const weekDays = getWeekDays()

const TimeInterValsSchema = z.object({})

export default function TimeIntervals() {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      intervals: [
        {
          weekday: 0,
          enabled: false,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekday: 1,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekday: 2,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekday: 3,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekday: 4,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekday: 5,
          enabled: true,
          startTime: '08:00',
          endTime: '18:00',
        },
        {
          weekday: 6,
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

  const intervals = watch('intervals') // retorna em tempo real as alterações

  const handleSetTimeIntervals = async () => {}

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
                    <Text>{weekDays[field.weekday]}</Text>
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

          <Button type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        </S.IntervalBox>
      </S.Header>
    </S.Container>
  )
}
