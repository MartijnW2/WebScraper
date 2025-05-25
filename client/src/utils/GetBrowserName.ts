export function getBrowserName(userAgent: string): string {
  if (userAgent.includes("Chrome") && !userAgent.includes("Edge") && !userAgent.includes("OPR")) {
    return "Chrome";
  }
  if (userAgent.includes("Firefox")) {
    return "Firefox";
  }
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari";
  }
  if (userAgent.includes("Edge")) {
    return "Edge";
  }
  if (userAgent.includes("OPR") || userAgent.includes("Opera")) {
    return "Opera";
  }
  return "Unknown";
}