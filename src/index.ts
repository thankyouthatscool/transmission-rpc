import { getSessionId } from "./functions";
import { ConnectionSettings } from "./types";

export const transmissionRPC = (connectionSettings: ConnectionSettings) => {
  return { getSessionId: async () => getSessionId(connectionSettings) };
};

(async () => {
  const { getSessionId } = transmissionRPC({
    address: "https://qube.scratchworks.dev",
    username: "admin",
    password: "password",
  });

  const sessionId = await getSessionId();

  console.log(sessionId);
})();
