import { DeleteIcon } from "./icons/DeleteIcon";
import { ShareIcon } from "./icons/shareIcon";
import { TitleIcon } from "./icons/titleIcon";
interface CardProps {
    _id: string; // Use _id as the identifier
    title: string;
    link: string;
    type: string;
    onDelete: (id: string) => void;
  }
   


export function Card ({ _id,title,link,type,onDelete}:CardProps)
{
    const embedUrl = type === "Youtube" ? getYouTubeEmbedUrl(link) : null;
    return( 
    <div>
        <div className="p-8 bg-white rounded-md border-gray-200 max-w-72 border min-h-48 min-w-72">
                    <div className="flex justify-between ">
                            <div className="flex items-center text-md ">
                                    <div className="pr-2 text-gray-500">
                                    <TitleIcon/>
                                    </div>
                                
                                {title}
                            </div>
                            <div className="flex items-center">
                                    <div className="pr-2 text-gray-500">
                                        <a href={link} target="_blank">
                                           <ShareIcon/>
                                        </a>
                                    </div>
                                    <div className="text-gray-500 cursor-pointer"
                                 onClick={() => onDelete(_id)} // Pass _id to the delete handler
                                >
                                  <DeleteIcon />
                           </div>
                            </div>


                    </div>
                    <div  className="pt-4">
                    {type === "Youtube" && embedUrl ? ( 
                            <iframe
                            className="w-full"
                            src={embedUrl}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            ></iframe>
                        ) : type === "Youtube" && !embedUrl ? (
                            <p>Invalid YouTube link</p>
                        ) : null}    

                        {type === "Twitter" && (
                            <blockquote className="twitter-tweet">
                                <a href={link.replace("x.com", "twitter.com")}>
                               
                                </a>
                            </blockquote>
                        )}
                    </div>
        </div>
    </div>
    )
}


const getYouTubeEmbedUrl = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "www.youtube.com" && urlObj.pathname === "/watch") {
        const videoId = urlObj.searchParams.get("v");
        if (videoId) {
          return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      return null;
    } catch (err) {
      console.error("Invalid YouTube URL", err);
      return null;
    }
  };