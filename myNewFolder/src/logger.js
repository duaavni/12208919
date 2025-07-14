// src/logger.js

const LOG_API_URL = "http://20.244.56.144/evaluation-service/logs";

// This token is used by the logger.
export const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJkdWFhdm5pMUBnbWFpbC5jb20iLCJleHAiOjE3NTI0NzUyMTYsImlhdCI6MTc1MjQ3NDMxNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImQ4MDc2OTgzLTUyNTYtNDA0OS05NjFlLWE2M2VlYzllMTkyZSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImF2bmkgZHVhIiwic3ViIjoiNWY4NzE1YjktMjBlZC00NjllLWI1NjMtOWUyODcxOGYxMDQ1In0sImVtYWlsIjoiZHVhYXZuaTFAZ21haWwuY29tIiwibmFtZSI6ImF2bmkgZHVhIiwicm9sbE5vIjoiMTIyMDg5MTkiLCJhY2Nlc3NDb2RlIjoiQ1p5cFFLIiwiY2xpZW50SUQiOiI1Zjg3MTViOS0yMGVkLTQ2OWUtYjU2My05ZTI4NzE4ZjEwNDUiLCJjbGllbnRTZWNyZXQiOiJBQkJhYmNLSERrQVJ0bXNDIn0.-yx4KK0mfWSsGRyewexpgDt1q0Hr-pxRCPku6PUULW4";

/**
 * Sends a log message to the logging service.
 * @param {string} token - The authorization token.
 * @param {'info' | 'error'} level - The log level.
 * @param {string} pkg - The package or component name.
 * @param {string} message - The log message.
 */
export const Log = async (token, level, pkg, message) => {
  try {
    fetch(LOG_API_URL, {
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
    console.error("Logging failed:", error);
  }
};