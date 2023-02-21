import http from "node:http";
import https from "node:https";

import type { ConnectionSettings } from "../types";

const protocols = { http, https };

export const getSessionId = ({
  address,
  port,
  password,
  username,
}: ConnectionSettings): Promise<string> => {
  return new Promise((resolve, reject) => {
    const { host: hostname, protocol } = new URL(address);

    const req = protocols[protocol === "http:" ? "http" : "https"].request(
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${username}:${password}`
          ).toString("base64")}`,
        },
        hostname,
        method: "POST",
        path: "/transmission/rpc",
        ...(!!port && { port }),
        protocol,
      },
      (res) => {
        res.on("data", () => {});

        res.on("end", () => {
          if (res.statusCode === 200 || res.statusCode === 409) {
            const sessionId = res.headers[
              "x-transmission-session-id"
            ] as string;

            resolve(sessionId);
          } else {
            reject(
              new Error(`HTTP request error: status code ${res.statusCode}`)
            );
          }
        });
      }
    );

    req.on("error", (err) => reject(err));
    req.write(JSON.stringify({}));
    req.end();
  });
};
