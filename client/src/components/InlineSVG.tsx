import Link from "@docusaurus/Link";

type InlineSVGProps = {
  href?: string;
  Svg: any;
  width: string | number;
  height: string | number;
  label: string;
  children?: JSX.Element;
  className?: string;
};

export function InlineSVG({
  href,
  Svg,
  width = 32,
  height = 32,
  label,
  children,
  className,
}: InlineSVGProps) {
  return href ? (
    <Link to={href} title={label} aria-label={label}>
      <Svg
        className={`inline-svg ${className || ""}`}
        width={width}
        height={height}
      />
      {children}
    </Link>
  ) : (
    <>
      <Svg
        className={`inline-svg ${className || ""}`}
        aria-label={label}
        width={width}
        height={height}
      />
      {children}
    </>
  );
}
