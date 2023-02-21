import { getSessionId } from "./functions";
import { ConnectionSettings } from "./types";

export const transmissionRPC = (connectionSettings: ConnectionSettings) => {
  return { getSessionId: async () => getSessionId(connectionSettings) };
};
