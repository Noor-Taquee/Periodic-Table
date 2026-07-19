export type InnerRoute = [string[], string[]];

export function changeHash(newHash: string) {
  window.location.hash = "#" + newHash;
}

type NormalizedHash = [string[], string[]];

/**
 * Normalizes a raw hash string into a tuple containing the location and attributes.
 */
export function normalize(rawHash: string): NormalizedHash {
  let location: string[] = [""];
  let attributes: string[] = [""];

  if (rawHash.length == 0) return [location, attributes];

  const hash = rawHash.slice(1);

  const hashParts = hash.split("&");

  const locationString = hashParts[0];

  location = locationString.split("/");

  attributes = hashParts.slice(1);

  return [location, attributes];
}
