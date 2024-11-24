interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

interface VideoSnippet {
  title: string;
  description: string;
  channelTitle: string;
  publishedAt: string;
  channelId: string;
  thumbnails: {
    default: Thumbnail;
    medium: Thumbnail;
    high: Thumbnail;
  };
  liveBroadcastContent: string;
  publishTime: string;
}

interface VideoId {
  kind: string;
  videoId: string;
  channelId?: string;
}

interface Video {
  kind: string;
  etag: string;
  id: VideoId;
  snippet: VideoSnippet;
}

export type { Video };