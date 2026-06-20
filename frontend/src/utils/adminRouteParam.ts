export function encodeAdminRouteParam(value: string): string {
  return encodeURIComponent((value || "").trim()).replace(/%/g, "~");
}

export function decodeAdminRouteParam(value: string): string {
  return decodeURIComponent((value || "").replace(/~/g, "%"));
}
