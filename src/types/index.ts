export interface ConnectionSettings {
  address: string;
  port?: number;
  password?: string;
  username?: string;
}

export enum TransmissionMethods {
  TorrentGet = "torrent-get",
}

export interface Torrent {
  id: number;
  name: string;
}
