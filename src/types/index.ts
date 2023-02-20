import { TORRENT_DATA_REQUEST_FIELDS } from "../constants";
export interface ConnectionSettings {
  hostname: string;
  protocol: string;
  port: number;
  path: string;
}
export type Torrent = {
  downloadedEver?: number;
  files?: {
    bytesCompleted: number;
    length: number;
    name: string;
  }[];
  fileStats?: {
    bytesCompleted: number;
    wanted: number;
    priority: number;
  };
  hashString?: string;
  id?: number;
  name?: string;
  peers?: Peer[];
  peersFrom: PeerFrom[];
  percentComplete?: number;
  percentDone?: number;
  pieces: string;
  priorities: number[];
  rateDownload?: number;
  rateUpload?: number;
  status?: number;
  totalSize?: number;
  trackers: Tracker[];
  trackerStats: TrackerStat[];
  wanted: number[];
};
export type Peer = {
  address: string;
  clientName: string;
  clientIsChoked: boolean;
  clientIsInterested: boolean;
  flagStr: string;
  isDownloadingFrom: boolean;
  isEncrypted: boolean;
  isIncoming: boolean;
  isUploading: boolean;
  isUTP: boolean;
  peerIsChocked: boolean;
  peerIsInterested: boolean;
  port: number;
  progress: number;
  rateToClient: number;
  rateToPeer: number;
};
export type PeerFrom = {
  fromCache: number;
  fromDht: number;
  fromIncoming: number;
  fromLpd: number;
  fromLtep: number;
  fromPex: number;
  fromTracker: number;
};
export type Tracker = {
  announce: string;
  id: number;
  scrape: string;
  tier: number;
};
export type TrackerStat = {
  announce: string;
  announceState: number;
  downloadCount: number;
  hasAnnounced: boolean;
  hasScraped: boolean;
  host: string;
  id: number;
  isBackup: boolean;
  lastAnnouncePeerCount: number;
  lastAnnounceResult: string;
  lastAnnounceStartTime: number;
  lastAnnounceSucceeded: boolean;
  lastAnnounceTime: number;
  lastAnnounceTimedOut: boolean;
  lastScrapeResult: string;
  lastScrapeStartTime: number;
  lastScrapeSucceeded: boolean;
  lastScrapeTime: number;
  lastScrapedTimeOut: boolean;
  leecherCount: number;
  nextAnnounceTime: number;
  nextScrapeTime: number;
  scrapeState: number;
  scrape: string;
  seederCount: number;
  sitename: string;
  tier: number;
};
export type TorrentDataField = typeof TORRENT_DATA_REQUEST_FIELDS[number];
