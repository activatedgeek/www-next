import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserGraduate,
  faCode,
  faArchive,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons"

import { creator, social } from "@/api/metadata"

const IconLink = ({ title, icon, href, color }) => (
  <a
    title={title}
    className="m-1.5"
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <FontAwesomeIcon icon={icon} color={color} />
  </a>
)

export default function Footer() {
  const { scholar, github, yc, linkedin, stackoverflow, twitter, code } = social

  return (
    <div className="text-slate-500 border-t-2 border-slate-200 mx-auto p-3 max-w-2xl sm:px-5 lg:max-w-3xl lg:px-7 xl:max-w-4xl">
      <div className="flex justify-center text-xl">
        <IconLink title="Archive" icon={faNoteSticky} href="/notes" />
        <IconLink title="Archive" icon={faArchive} href="/db" />
        <IconLink
          title="Semantic Scholar"
          icon={faUserGraduate}
          color="rgb(239,202,77)"
          href={scholar}
        />
        <IconLink
          title="Github"
          icon={faGithub}
          color="rgb(27,31,35)"
          href={github}
        />
        <IconLink
          title="LinkedIn"
          icon={faLinkedin}
          color="rgb(14,79,180)"
          href={linkedin}
        />
        <IconLink
          title="StackOverflow"
          icon={faStackOverflow}
          color="rgb(239,107,29)"
          href={stackoverflow}
        />
        <IconLink
          title="Twitter"
          icon={faTwitter}
          color="rgb(29,142,238)"
          href={twitter}
        />
        <IconLink title="Source Code" icon={faCode} href={code} />
      </div>
      <div className="flex justify-center">
        <p>
          © {new Date().getFullYear()} {creator}
        </p>
      </div>
    </div>
  )
}
