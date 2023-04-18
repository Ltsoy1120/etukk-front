import "./EditAvatar.scss"

import {FILE_TYPES} from "consts"
import {getUser} from "infrastructure/persistence/api/data/actions"
import {mapUser} from "infrastructure/persistence/api/mappings/user"
import {userUpdate} from "infrastructure/persistence/redux/reducers/user"
import {ChangeEvent, useState} from "react"
import {useClient} from "react-fetching-library"
import {useDispatch} from "react-redux"
import {classWithModifiers} from "utils/common"

import Icon from "../Icon/Icon"

interface EditAvatarProps {
  image: string
  onChange(file: File): void | Promise<unknown>
}

function EditAvatar(props: EditAvatarProps) {
  const [image, setImage] = useState(props.image)
  const [pending, setPending] = useState(false)
  const dispatch = useDispatch()
  const client = useClient()

  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    const target = event.currentTarget
    // checks
    const files = target.files
    if (files === null) return
    const file = files[0] as File | undefined
    if (file == null) return
    if (!file.type.startsWith("image")) return
    if (file.name.split(".").pop() === "gif") return
    // awaits
    setPending(true)
    await props.onChange(file)
    setPending(false)
    // updates
    setImage(URL.createObjectURL(file))
    const {error, payload} = await client.query(getUser())
    if (error) return
    if (payload == null) return

    dispatch(userUpdate(mapUser(payload)))
  }
  return (
    <div className={classWithModifiers("edit-avatar", pending && "pending")}>
      <img src={image} alt="avatar" className="edit-avatar__image" />
      <label className="edit-avatar__cover">
        <Icon className="edit-avatar__icon" name="camera" />
        <input
          className="edit-avatar__input"
          type="file"
          accept={FILE_TYPES.IMAGE.map(i => "." + i).join(",")}
          onChange={onChange}
          aria-hidden={false}
        />
      </label>
    </div>
  )
}

export default EditAvatar
