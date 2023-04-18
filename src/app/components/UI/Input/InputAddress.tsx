import {getAddressPrompt} from "infrastructure/persistence/api/data/actions"
import {ChangeEvent, useEffect, useState} from "react"
import {useQuery} from "react-fetching-library"

import Input, {InputProps} from "./Input"

function InputAddress(props: InputProps) {
  const [value, setValue] = useState<string>(
    props.defaultValue?.toString() ?? ""
  )
  const response = useQuery(getAddressPrompt(value), false)
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget

    setValue(target.value)
    props.onChange?.(event)
  }

  useEffect(() => {
    if (value.length === 0) return

    response.query()
  }, [value])
  return (
    <Input
      {...props}
      type="address-text"
      width={"30em"}
      dataList={response.payload?.addresses ?? []}
      // value={value}
      validity
      onChange={onChange}
    />
  )
}

export default InputAddress
