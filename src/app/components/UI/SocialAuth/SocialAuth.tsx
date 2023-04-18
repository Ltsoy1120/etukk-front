import "./SocialAuth.scss"

import Icon from "app/components/UI/Icon/Icon"

// import { getUsersSignupBySocialKey } from "infrastructure/persistence/api/data/actions"
import ActionOuterLink from "../ActionOuterLink"

function SocialAuth() {
  return (
    <div className="social-auth">
      <div className="social-auth__text">Войти через</div>
      <div className="social-auth__socials">
        {/* <ActionOuterLink action={getUsersSignupBySocialKey("yandex")}> */}
        <Icon name="yandex" />
        <Icon name="google" />
        <Icon name="apple" />
        {/* </ActionOuterLink> */}
        {/* <ActionOuterLink action={getUsersSignupBySocialKey("google")}>
            <Icon name="google" />
          </ActionOuterLink> */}
        {/* <ActionOuterLink action={getUsersSignupBySocialKey("vkontakte")}>
          <Icon name="vk" />
        </ActionOuterLink> */}
        {/* <ActionOuterLink action={getUsersSignupBySocialKey("facebook")}>
              <Icon name="facebook" />
            </ActionOuterLink> */}
        {/* <ActionOuterLink action={getUsersSignupBySocialKey("odnoklassniki")}>
          <Icon name="odnoklassniki" />
        </ActionOuterLink> */}
        {/* <ActionOuterLink action={getUsersSignupBySocialKey("apple")}>
            <Icon name="apple" />
          </ActionOuterLink> */}
      </div>
    </div>
  )
}

export default SocialAuth
