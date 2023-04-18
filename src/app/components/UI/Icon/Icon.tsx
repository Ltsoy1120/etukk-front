import "./Icon.scss"

import {SVGAttributes} from "react"
import {classMerge, classWithModifiers} from "utils/common"

export type IconName =
  | (
      | "rub"
      | "attention"
      | "bell"
      | "bookmark"
      | "bookmark-3d"
      | "building"
      | "calendar"
      | "camera"
      | "chevron"
      | "clip"
      | "copy"
      | "cross"
      | "plus"
      | "filter"
      | "google"
      | "apple"
      | "facebook"
      | "vk"
      | "yandex"
      | "odnoklassniki"
      | "like"
      | "dislike"
      | "line"
      | "menu"
      | "play"
      | "rectangle"
      | "rectangle-double"
      | "star"
      | "star-empty"
      | "truck"
      | "check"
      | "not-allowed"
      | "pending"
      | "send"
      | "smile"
      | "eye"
      | "hammer"
      | "more"
      | "sort"
      | "dots"
      | "search"
      | "search-filled"
      | "share"
      | "user"
      | "cup"
      | "delivery"
    )
  | (string & {})

interface IconProps extends Exclude<SVGAttributes<SVGElement>, "aria-hidden"> {
  size?: string
  name?: IconName
  modifiers?: Array<string | number | false | null | undefined>
}

/**
 *
 * @prop `modifiers` only work when className given.
 * @prop `className` is a root class, which is modified by `name`,
 * that will be modified by `modifiers` including `name` modifications.
 *
 * Example: `"icon mentor-search__icon mentor-search__icon--chevron mentor-search__icon mentor-search__icon--chevron--up"`
 *
 */

function Icon(props: IconProps) {
  if (props.href) {
    return (
      <img
        src={props.href}
        aria-hidden="true"
        className={classMerge(
          "icon",
          props.className &&
            classWithModifiers(props.className, ...(props.modifiers || []))
        )}
      />
    )
  }

  return (
    <svg
      {...props}
      aria-hidden="true"
      style={{"--icon-size": props.size}}
      className={classMerge(
        "icon",
        props.className &&
          classWithModifiers(
            classWithModifiers(props.className, props.name),
            ...(props.modifiers || [])
          )
      )}>
      <use href={`/static/icons.svg#${props.name}`} />
    </svg>
  )
}

export default Icon
