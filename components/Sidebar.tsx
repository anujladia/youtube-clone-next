"use client"

import React, { useState, useEffect, useRef } from "react"
import { useDebouncedCallback } from "use-debounce";
import { useParams, useRouter } from "next/navigation";

import { useVideo } from "@/contexts/video/VideoContext";

import video_data from "@/placeholder/video_data.json";
import placeholder from "@/public/placeholder.png";
import CustomImage from "@/components/CustomImage";

import hardCopy from "@/utils/hardCopy";

import { VIDEO_LIMIT } from "@/constants";

import { Video } from "@/types/video";

interface SearchProps {
  setVideoList: (videos: Video[]) => void;
}

const Search: React.FC<SearchProps> = ({ setVideoList }: SearchProps) => {
  const onSearch = useDebouncedCallback((e) => {
    const { value } = e.target;

    const filtered_videos = video_data.items.filter((video) => {
      const { snippet } = video;
      const { title, description, channelTitle } = snippet;
      return title.toLowerCase().includes(value.toLowerCase())
        || description.toLowerCase().includes(value.toLowerCase())
        || channelTitle.toLowerCase().includes(value.toLowerCase());
    });
    
    setVideoList(filtered_videos as Video[]);
  }, 300);

  return (
    <form className="w-full flex-center h-12">
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search for name or description or channel"
          onChange={onSearch}
        />
      </div>
    </form>
  )
};

const Sidebar: React.FC = () => {  
  const router = useRouter();
  const { id: videoId }: { id: string } = useParams();
  const { setSelectedVideo }: { setSelectedVideo: (video: Video) => void } = useVideo();
  const [videoList, setVideoList]: [Video[], (videos: Video[]) => void] = useState<Video[]>([]);
  const [page, setPage]: [number, (page: number) => void] = useState<number>(1);

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const listInnerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const video_list: Video[] = hardCopy(video_data.items) as Video[];
    setVideoList(video_list.splice(0, VIDEO_LIMIT));

    if (listInnerRef.current && scrollPosition > 0) {
      listInnerRef.current.scrollTop = scrollPosition;
    }
  }, []);

  const onVideoSelection = (video: Video) => {
    router.replace(`/video/${video?.id?.videoId}`);
    setSelectedVideo(video);
  };

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const { scrollTop, scrollHeight, clientHeight } = target;

    setScrollPosition(scrollTop);
    
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      const offset = page * VIDEO_LIMIT;
      if (offset < video_data.items.length) {
        setVideoList([
          ...videoList,
          ...hardCopy(video_data.items.slice(offset, offset + VIDEO_LIMIT)) as Video[]
        ]);
        setPage(page + 1);
      }
    }
  };

  return (
    <section className="mr-4 p-4 w-full h-full">
      <Search setVideoList={setVideoList} />

      <div
        className="w-full overflow-scroll mt-4 h-[1000px] md:h-[calc(100%-3rem)]"
        onScroll={onScroll}
        ref={listInnerRef}
      >
        {videoList.length === 0
          ? <div>
            <span>No video found</span>
          </div>
          : <></>
        }
        {
          videoList.map((video) => {
            return (
              <div
                className={`w-full flex flex-row my-3 py-3 cursor-pointer hover:bg-gray-800  ${videoId === video?.id?.videoId ? "bg-gray-800" : ""}`}
                onClick={() => onVideoSelection(video)}
                key={video.etag}
              >
                <div className="w-2/5 relative">
                  <div
                    className="w-full aspect-w-16 aspect-h-9"
                  >
                    <CustomImage
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.title}
                      sizes=""
                      layout={'fill'}
                      objectFit={'cover'}
                      placeholderImage={placeholder}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-3/5 ml-2">
                  <h2 className="truncate font-semibold text-sm uppercase">
                    {video.snippet.title}
                  </h2>
                  <p className="desc line-clamp-2 text-xs normal-case">
                    {video.snippet.description}
                  </p>
                  <p className="text-xs normal-case mt-1">
                    {video.snippet.channelTitle}
                  </p>
                </div>
                <br />
              </div>
            )
          })
        }
      </div>
    </section>
  )
}

export default Sidebar
