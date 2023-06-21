import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserGraduate,
  faCode,
  faArchive,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faYCombinator,
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
    <div className="mx-auto mt-6 border-t-2 border-slate-300 p-6 max-w-3xl sm:px-9 lg:max-w-4xl lg:px-12 xl:max-w-6xl text-slate-500">
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
          title="Hacker News"
          icon={faYCombinator}
          color="rgb(251,78,9)"
          href={yc}
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
