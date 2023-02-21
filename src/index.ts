import { getSessionId, performRequest } from "./functions";
import { ConnectionSettings, Torrent, TransmissionMethods } from "./types";

import { localHTTPUnsecureConnectionSettings } from "./tests";

export const transmissionRPC = (connectionSettings: ConnectionSettings) => {
  return {
    getSessionId: async () => getSessionId(connectionSettings),
    getTorrentList: async (fields: string[]) => {
      const sessionId = await getSessionId(connectionSettings);

      const resString = await performRequest(
        connectionSettings,
        sessionId,
        TransmissionMethods.TorrentGet,
        { fields }
      );

      const res = JSON.parse(resString) as {
        arguments: { torrents: Torrent[] };
        result: string;
      };

      return res;
    },
  };
};

(async () => {
  const { getTorrentList } = transmissionRPC(
    localHTTPUnsecureConnectionSettings
  );

  const torrentList = await getTorrentList(["id", "name"]);

  console.log(torrentList.arguments.torrents);
})();
