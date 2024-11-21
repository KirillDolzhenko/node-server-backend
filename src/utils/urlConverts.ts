import url from "url";

export function urlToArray(urlString: string) {
  return url.parse(urlString, true).path?.split("/").slice(1) || [];
}
