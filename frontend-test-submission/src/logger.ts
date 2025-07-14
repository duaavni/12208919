
type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
type LogStack = "frontend";
type LogPackage = "api" | "component" | "page" | "state" | "utils";

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

export const Log = async (
  token: string,
  level: LogLevel,
  pkg: LogPackage,
  message: string
) => {
  try {
    await fetch(LOG_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        stack: "frontend", 
        level,
        package: pkg,
        message,
      }),
    });
  } catch (error) {
   
  }
};