import http from "node:http";
import https from "node:https";

import { ConnectionSettings, TransmissionMethods } from "../types";

const protocols = { http, https };

export const performRequest = async (
  connectionSettings: ConnectionSettings,
  sessionId: string,
  transmissionMethod: TransmissionMethods,
  transmissionmethodArguments: any
): Promise<string> => {
  const { address, port, username, password } = connectionSettings;

  const { hostname, protocol } = new URL(address);

  const data: Buffer[] = [];

  return new Promise((resolve, reject) => {
    const req = protocols[protocol === "http:" ? "http" : "https"].request(
      {
        hostname,
        port: port,
        protocol,
        path: "/transmission/rpc",
        method: "POST",
        headers: {
          authentication: Buffer.from(`${username}:${password}`).toString(
            "base64"
          ),
          "x-transmission-session-id": sessionId,
        },
      },
      (res) => {
        res
          .on("data", (chunk) => {
            data.push(chunk);
          })
          .on("end", () => {
            if (res.statusCode === 200) {
              const responseDataString = Buffer.concat(data).toString();

              resolve(responseDataString);
            } else {
              reject(new Error(`HTTP request error: ${res.statusCode}`));
            }
          });
      }
    );

    req.on("error", (err) => reject(err));
    req.write(
      JSON.stringify({
        method: transmissionMethod,
        arguments: { ...transmissionmethodArguments },
      })
    );
    req.end();
  });
};
