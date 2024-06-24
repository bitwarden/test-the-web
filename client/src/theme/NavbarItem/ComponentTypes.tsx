import ComponentTypes from "@theme-original/NavbarItem/ComponentTypes";
import { InlineSVG, InlineSVGProps } from "@site/src/components/InlineSVG";
import GithubLogo from "@site/static/img/icons/github.svg";
import AngleRight from "@site/static/img/icons/angle-right.svg";
import { Props as NavbarItemType } from "@theme/NavbarItem";

function GithubIcon({
  mobile, // do not pass to inline SVG
  ...props
}: NavbarItemType & InlineSVGProps): JSX.Element {
  return <InlineSVG {...{ ...props, Svg: GithubLogo }} />;
}

function AngleRightIcon({
  mobile, // do not pass to inline SVG
  ...props
}: NavbarItemType & InlineSVGProps): JSX.Element {
  return <InlineSVG {...{ ...props, Svg: AngleRight }} />;
}

export default {
  ...ComponentTypes,
  "custom-githubIcon": GithubIcon,
  "custom-angleRight": AngleRightIcon,
};
