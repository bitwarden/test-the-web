import { useLocation, useHistory } from "@docusaurus/router";

export function NestedIframeControl({
  name = "nested-iframe-control",
}: {
  name?: string;
}) {
  let { pathname, search } = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(search);
  const depthParam = queryParams.get("depth");
  const defaultValue = parseInt(depthParam || "3", 10);

  function handleInputChange({ target }: React.ChangeEvent<HTMLInputElement>) {
    const newValue = target?.value ? parseInt(target.value, 10) : 0;

    history.push(pathname + `?depth=${newValue}`);
  }

  return (
    <input
      type="number"
      name={name}
      defaultValue={defaultValue}
      min={0}
      max={100}
      step={1}
      inputMode="numeric"
      pattern="\d*"
      onChange={handleInputChange}
    />
  );
}
