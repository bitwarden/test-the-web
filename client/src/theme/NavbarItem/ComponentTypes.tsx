import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import { InlineSVG, InlineSVGProps } from "@site/src/components/InlineSVG";
import GithubLogo from "@site/static/img/icons/github.svg";
import AngleRight from "@site/static/img/icons/angle-right.svg";
import { Props as NavbarItemType } from "@theme/NavbarItem";

function GithubIcon(props: NavbarItemType & InlineSVGProps): JSX.Element {
  return <InlineSVG {...{ ...props, Svg: GithubLogo }} />;
}

export default {
  ...ComponentTypes,
  "custom-githubIcon": GithubIcon,
  "custom-angleRight": AngleRight,
};
