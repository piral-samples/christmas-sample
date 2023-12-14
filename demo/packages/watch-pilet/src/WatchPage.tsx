import * as React from "react";
import { Player } from "./Player";
import { useParams } from "react-router";

const WatchPage: React.FC = () => {
  const { media_type, video_id } = useParams();

  return (
    <div className="WatchPage">
      <Player media_type={media_type} video_id={video_id} />
    </div>
  );
};

export default WatchPage;
