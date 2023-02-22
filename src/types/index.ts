export interface ConnectionSettings {
  address: string;
  port?: number;
  password?: string;
  username?: string;
}

export enum TransmissionMethods {
  TorrentGet = "torrent-get",
  TorrentStop = "torrent-stop",
  TorrentStart = "torrent-start",
}

export interface Torrent {
  id: number;
  name: string;
}
