import { TORRENT_DATA_REQUEST_FIELDS } from "./constants";
import {
  getSessionId,
  performRequest,
  startTorrent,
  stopTorrent,
} from "./functions";

export const transmissionRPC = (connectionSettings) => {
  return {
    getSessionIds: async () => getSessionId(connectionSettings),
    getTorrentData: async (props) => {
      const sessionId = await getSessionId(connectionSettings);
      const res = await performRequest({
        connectionSettings,
        method: "torrent-get",
        methodArguments: {
          ids: !!props?.ids?.length ? props.ids : undefined,
          fields: props?.fields || TORRENT_DATA_REQUEST_FIELDS,
          format: props?.format,
        },
        sessionId,
      });
      const torrentList = JSON.parse(res);
      return {
        result: torrentList.result,
        torrents: torrentList.arguments.torrents,
      };
    },
    // Torrent Actions
    startTorrent: (ids) => startTorrent(connectionSettings, ids),
    stopTorrent: (ids) => stopTorrent(connectionSettings, ids),
  };
};
