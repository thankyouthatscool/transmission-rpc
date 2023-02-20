import http from "node:http";
import https from "node:https";

const protocols = { http, https };
export const getSessionId = async ({ hostname, path, port, protocol }) => {
  return new Promise((resolve, reject) => {
    const req = protocols.http.request(
      {
        hostname,
        protocol,
        port,
        path,
        method: "POST",
      },
      (res) => {
        res.on("end", () => {
          if (res.statusCode === 200 || res.statusCode === 409) {
            const sessionId = res.headers["x-transmission-session-id"];
            resolve(sessionId);
          } else {
            reject(new Error(`HTTP request error: ${res.statusCode}`));
          }
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.write(JSON.stringify({}));
    req.end();
  });
};
