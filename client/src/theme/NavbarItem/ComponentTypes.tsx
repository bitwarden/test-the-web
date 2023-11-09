import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import { InlineSVG } from "@site/src/components/InlineSVG";
import GithubLogo from "@site/static/img/icons/github.svg";
import AngleRight from "@site/static/img/icons/angle-right.svg";

function GithubIcon(props) {
  return <InlineSVG {...{ ...props, Svg: GithubLogo }} />;
}

export default {
  ...ComponentTypes,
  "custom-githubIcon": GithubIcon,
  "custom-angleRight": AngleRight,
};
