import "./Checkbox.scss"

import {filterCategoryStorage} from "app/components/containers/Filters/Filters"
import {FiltersType} from "app/components/containers/Filters/Filters.types"
import {ChangeEvent, Dispatch, useEffect, useState} from "react"
import {classWithModifiers} from "utils/common"

// import Icon from "../Icon/Icon"

export interface CheckboxCategoryProps {
  name: string
  child: {id: number; name: string; parent_category_id?: number | null}
  currentCategoryId?: number | null
  onChange?: Dispatch<number>
  onSubmit?: Dispatch<FiltersType>
}

function CheckboxCategory(props: CheckboxCategoryProps) {
  const isChecked = props.currentCategoryId === props.child.parent_category_id

  function onChange() {
    filterCategoryStorage.set("filter-category", props.child.id)
    props.onChange && props.onChange(props.child.id)
    props.onSubmit && props.onSubmit({categories: props.child.id})
  }
  return (
    <label className="checkbox">
      {/* <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        onChange={onChange}
      />
      <div className="checkbox__appearance">
        <Icon className="checkbox__icon" name="check" />
      </div> */}

      <div
        className={classWithModifiers(
          "checkbox__title",
          props.currentCategoryId &&
            props.child.id &&
            (isChecked || props.currentCategoryId === props.child.id) &&
            "checked"
        )}
        onClick={onChange}>
        {props.child.name}
      </div>
    </label>
  )
}

export default CheckboxCategory
