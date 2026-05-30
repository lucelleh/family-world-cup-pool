/**
 * Convert UTC time to South African Standard Time (SAST)
 * SAST is UTC+2
 */
export function convertToSAST(utcDate: string | Date): Date {
  const date = new Date(utcDate);
  // SAST is UTC+2
  return new Date(date.getTime() + 2 * 60 * 60 * 1000);
}

export function formatSASTTime(date: Date): string {
  return date.toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function formatSASTDate(date: Date): string {
  return date.toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatSASTTimeOnly(date: Date): string {
  return date.toLocaleString("en-ZA", {
    timeZone: "Africa/Johannesburg",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
