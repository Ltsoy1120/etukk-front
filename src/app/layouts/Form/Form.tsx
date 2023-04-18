import "./Form.scss"

import {getBiddingTime} from "app/views/lot-new/edit/helpers"
import {LotSpecificationsType} from "areas/lot/types"
import _, {includes} from "lodash"
import {
  DetailedHTMLProps,
  FormEvent,
  FormHTMLAttributes,
  MutableRefObject,
} from "react"
import {classWithModifiers} from "utils/common"

type FormValue =
  | string
  | string[]
  | number
  | number[]
  | LotSpecificationsType
  | boolean
  | null
  | undefined
type FormValues = Record<string, FormValue>

/**
 * @param Key - Keys union (may be Enum)
 * @param Value - Values union (may be any)
 *
 * @example FormState<MyEnum, string>
 * @example FormState<"myKey1" | "myKey2", number>
 */
export interface FormState<Key extends keyof never, Value> {
  // Type-safe Values
  keys: (Key extends String ? Key : never)[]
  values: Value extends {[P in Key]?: unknown}
    ? Pick<Value, Key> & Record<Exclude<keyof Value, Key>, unknown>
    : Record<Key, Value>
  formData: FormData
}

interface FormProps<K extends keyof never, V>
  extends Omit<
    DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>,
    "onSubmit"
  > {
  centered?: boolean
  gap?: "2em"

  formRef?: MutableRefObject<HTMLFormElement | null>
  onSubmit?: (state: FormState<K, V>, event: FormEvent<HTMLFormElement>) => void
}

function Form<K extends keyof never, V>(props: FormProps<K, V>) {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formState = (await getFormState(event.currentTarget)) as FormState<
      K,
      V
    >

    props.onSubmit?.(formState, event)
  }
  return (
    <form
      {..._.omit(props, "centered")}
      ref={props.formRef}
      style={{gap: props.gap}}
      className={classWithModifiers(
        props.className || "form",
        props.centered && "centered"
      )}
      onSubmit={onSubmit}
    />
  )
}

async function getFormState(form: HTMLFormElement): Promise<{
  keys: string[]
  values: FormValues
  formData: FormData
}> {
  const arr: LotSpecificationsType = []
  const formData = new FormData(form)
  const keys: string[] = []

  for (const element of form.elements) {
    if (
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement
    ) {
      if (keys.includes(element.name)) continue
      keys.push(element.name)
    }
  }

  const values: FormValues = {}
  let newSpecification = {name: "", value: ""}
  for (const key of keys) {
    const next = form.elements.namedItem(key)
    if (next instanceof HTMLInputElement) {
      if (next.checked) {
        values[next.name] = true
        continue
      }
      // if (next.files instanceof File) {
      //   console.log("next", next)
      //   console.log("FileList", next.files)
      //   console.log("next.name", next.name)
      //   console.log(
      //     "Promise",
      //     await Promise.all([...next.files].map(FileToURLDataBase64))
      //   )
      //   values[next.name] = await Promise.all(
      //     [...next.files].map(FileToURLDataBase64)
      //   )
      //   console.log("values", values)

      //   continue
      // }
    }

    if (
      next instanceof HTMLInputElement ||
      next instanceof HTMLTextAreaElement
    ) {
      if (next.value.length === 0) continue

      if (next.name.includes("specifications")) {
        if (next.name.includes("key")) {
          if (next.id.length >= 13) {
            newSpecification = {...newSpecification, name: next.value}
          } else {
            arr.push({id: Number(next.id), name: next.value, value: ""})
          }
        } else {
          if (next.id.length >= 13) {
            newSpecification = {
              ...newSpecification,
              value: next.value,
            }
            arr.push(newSpecification)
          } else {
            const index = arr.findIndex(item => item.id === Number(next.id))
            if (index !== -1) {
              arr[index] = {...arr[index], value: next.value}
            }
          }
        }
        values["lotspecifications"] = arr
      } else {
        values[next.name] = isNaN(Number(next.value))
          ? next.value
          : Number(next.value)
      }
    }

    if (next instanceof RadioNodeList) {
      const radios = [...next] as HTMLInputElement[]
      const checks = radios.map(radio => radio.checked && radio.value)
      if (radios[0].name === "date") {
        const date = checks.findIndex(check => check)
        const [startTime, endTime] = await getBiddingTime(+date)
        values["bidding_start_time"] = startTime.toJSON()
        values["bidding_end_time"] = endTime.toJSON()
      }
      values[radios[0].name] = checks.flatMap(check =>
        !check || isNaN(Number(check)) ? [] : Number(check)
      )
    }
  }

  return {keys, values, formData}
}

export default Form
