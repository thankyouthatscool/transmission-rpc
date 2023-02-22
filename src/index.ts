import { getSessionId, performRequest } from "./functions";
import { ConnectionSettings, Torrent, TransmissionMethods } from "./types";

type TorrentFields =
  | "addedDate"
  | "availability"
  | "dateCreated"
  | "hashString"
  | "id"
  | "labels"
  | "leftUntilDone"
  | "magnetLink"
  | "name"
  | "percentDone"
  | "startDate"
  | "status"
  | "totalSize";

export const transmissionRPC = (connectionSettings: ConnectionSettings) => {
  return {
    getSessionId: async () => getSessionId(connectionSettings),
    getTorrentList: async (fields: TorrentFields[]) => {
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
    startTorrent: async () => {
      const sessionId = await getSessionId(connectionSettings);

      const resString = await performRequest(
        connectionSettings,
        sessionId,
        TransmissionMethods.TorrentStart
      );

      const res = JSON.parse(resString) as { result: string };

      return res;
    },
    stopTorrent: async (ids?: number[]) => {
      const sessionId = await getSessionId(connectionSettings);

      const resString = await performRequest(
        connectionSettings,
        sessionId,
        TransmissionMethods.TorrentStop,
        { ids }
      );

      const res = JSON.parse(resString) as { result: string };

      return res;
    },
  };
};
