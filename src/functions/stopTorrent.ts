import { getSessionId, performRequest } from "../functions";
import { ConnectionSettings } from "../types";

export const stopTorrent = async (
  connectionSettings: ConnectionSettings,
  ids: string[]
) => {
  const sessionId = await getSessionId(connectionSettings);

  const stopTorrentResponse = await performRequest({
    connectionSettings,
    method: "torrent-stop",
    methodArguments: { ids: !!ids?.length ? ids : undefined },
    sessionId,
  });
  const { result } = JSON.parse(stopTorrentResponse);
  return { result };
};
