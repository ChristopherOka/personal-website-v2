import { getFileHtml } from "../render";

export default function IconLink({
  iconName,
  href,
}: {
  iconName: string;
  href: string;
}) {
  const componentHtml = getFileHtml(iconName);
  return `<a target="_blank" rel="noopener noreferrer" href="${href}">${componentHtml}</a>`;
}
