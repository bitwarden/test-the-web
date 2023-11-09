import Logo from "@theme/Logo";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useThemeConfig } from "@docusaurus/theme-common";
import SiteLogo from "@site/static/img/icons/browser.svg";
import { InlineSVG } from "@site/src/components/InlineSVG";

function NavbarLogo() {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { title: navbarTitle, logo },
  } = useThemeConfig();
  const logoLink = useBaseUrl(logo?.href || "/");
  // If visible title is shown, fallback alt text should be
  // an empty string to mark the logo as decorative.
  const fallbackAlt = navbarTitle ? "" : title;
  // Use logo alt text if provided (including empty string),
  // and provide a sensible fallback otherwise.
  const alt = logo?.alt ?? fallbackAlt;

  return logo?.src === "inlineSVG" ? (
    <Link
      to={logoLink}
      className="navbar__brand"
      {...(logo.target && { target: logo.target })}
    >
      <div className="navbar__logo">
        <InlineSVG
          Svg={SiteLogo}
          width={logo.width}
          height={logo.height}
          label={alt}
          className={logo.className}
        />
      </div>
      {navbarTitle != null && (
        <b className="navbar__title text--truncate">{navbarTitle}</b>
      )}
    </Link>
  ) : (
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}

export default NavbarLogo;
