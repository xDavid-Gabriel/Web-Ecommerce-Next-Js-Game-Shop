interface Props {
  video: string
}
export const Video = ({ video }: Props) => {
  const youtubeLink = video
  const videoIdMatch = youtubeLink.match(/v=([^&]*)/)

  return (
    <iframe
      width="100%"
      height="630"
      loading="lazy"
      src={
        videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : ''
      }
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  )
}
