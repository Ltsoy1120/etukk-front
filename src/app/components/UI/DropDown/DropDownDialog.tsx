import DialogLayout from "app/layouts/Modal/DialogLayout/DialogLayout"

import DropDown, { DropDownProps } from "./DropDown"

function DropDownDialog<V = string | undefined>(props: DropDownProps<V>) {
  return (
    <DialogLayout>
      <DropDown {...props} relative />
    </DialogLayout>
  )
}

export default DropDownDialog
