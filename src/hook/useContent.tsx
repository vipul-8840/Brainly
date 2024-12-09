import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../components/config";
interface Content {
  _id: string;
  title: string;
  link: string;
  type: string;
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);

  async function refresh() {
     await axios
      .get(BACKEND_URL + "/api/v1/content", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setContents(response.data.content);
      });
  }

 async function deleteContent(_id: string) 
  {
      console.log(_id);
      const response = await axios.delete(
        `http://localhost:3000/api/v1/content?id=${encodeURIComponent(_id)}`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      ).then(() => {
        setContents((prevContents) =>
          prevContents.filter((content) => content._id !== _id) 
        );
      })
      .catch((error) => console.error("Error deleting content:", error));
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000); 
    return () => {
      clearInterval(interval); 
    };
  }, []);

  return { contents, refresh, deleteContent };
}
