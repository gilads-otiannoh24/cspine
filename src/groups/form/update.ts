import { Options } from "@/CSPine";
import { setVariable } from "@/utils/accessVariable";
import { warn as warnE } from "@/utils/issueWarning";
import { resolveEventNode } from "@/utils/resolveEventNode";
import { useContext } from "@/utils/useContext";

export function update(el: HTMLElement, options: Options) {
  const ctx = useContext(el, { fn: "update", group: "form" }, options, true);
  const { fn, group, parsed, nodes } = ctx;
  const { e: event, this: cp } = options;
  const { value, type, files } = event?.target as HTMLInputElement;
  const warn = warnE(fn, group, el);

  if (!nodes.length) return warn.emptyNode();
  if (!event) return warn.emptyEvent();
  if (!type || !value) return warn.form.noTypeOrValue();

  if (event && !["input", "change"].includes(event.type))
    return warn.unexpectedEvent("input or change", event);

  const eventNode = resolveEventNode(nodes, options);
  const val =
    {
      checkbox: value === "on",
      number: Number(value) || 0,
      range: Number(value),
      date: new Date(value),
      time: value,
      color: value,
      file: files || value,
      radio: value,
      select: value,
      tel: String(value).trim(),
      email: String(value).trim().toLowerCase(),
      url: String(value).trim(),
      text: String(value).trim(),
      textarea: String(value).trim(),
    }[type] ?? value;

  if (eventNode.node.length)
    return setVariable(cp, eventNode.parsed?.reference as string, val);

  setVariable(cp, parsed?.reference as string, val);
}
