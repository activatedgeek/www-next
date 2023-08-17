import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserGraduate,
  faGraduationCap,
  faCode,
  faArchive,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons"
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
  faXTwitter,
  faHackerNewsSquare,
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
  const {
    gscholar,
    scholar,
    github,
    yc,
    linkedin,
    stackoverflow,
    twitter,
    code,
  } = social

  return (
    <div className="text-slate-500 border-t-2 border-slate-200 mx-auto p-3 max-w-2xl sm:px-5 lg:max-w-3xl lg:px-7 xl:max-w-4xl">
      <div className="flex justify-center text-xl">
        <IconLink
          title="Google Scholar"
          icon={faGraduationCap}
          color="#4d90fe"
          href={gscholar}
        />
        <IconLink
          title="Semantic Scholar"
          icon={faUserGraduate}
          color="#f4d35e"
          href={scholar}
        />
        <IconLink
          title="Github"
          icon={faGithub}
          color="#24292f"
          href={github}
        />
        <IconLink
          title="Hacker News"
          icon={faHackerNewsSquare}
          color="#ff6600"
          href={yc}
        />
        <IconLink
          title="LinkedIn"
          icon={faLinkedin}
          color="#0a66c2"
          href={linkedin}
        />
        <IconLink
          title="StackOverflow"
          icon={faStackOverflow}
          color="#f48225"
          href={stackoverflow}
        />
        <IconLink
          title="Twitter"
          icon={faXTwitter}
          color="#0f1419"
          href={twitter}
        />
      </div>
      <div className="flex justify-center align-center">
        <p className="m-1.5">
          © {new Date().getFullYear()} {creator}
        </p>
        <IconLink title="Archive" icon={faNoteSticky} href="/notes" />
        <IconLink title="Archive" icon={faArchive} href="/db" />
        <IconLink title="Source Code" icon={faCode} href={code} />
      </div>
    </div>
  )
}
