import React, { useState, useEffect } from "react";
import axios from "axios";
import MemePhotoswipe from "./Photoswipe";
import styles from "./MemeGallery.module.css";

const Memes = () => {
  // State variables to manage meme data and photo swipe modal
  const [memesList, setMemesList] = useState([]);
  const [afterToken, setAfterToken] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [isPhotoSwipeOpen, setPhotoSwipeOpen] = useState(false);

  // Function to fetch memes data from Reddit API
  const fetchMemesData = async () => {
    try{
      const response = await axios.get(
        `https://www.reddit.com/r/memes.json?after=${afterToken || ""}`
      );

      // Extract relevant data from API response and update state
      const newMemes = response.data.data.children.map((child) => ({
        id: child.data.id,
        title: child.data.title,
        thumbnail: child.data.thumbnail,
        url: child.data.url,
      }));

      setMemesList((prevMemes) => [...prevMemes, ...newMemes]);
      setAfterToken(response.data.data.after);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  // Function to handle click on meme thumbnail and open the photo swipe modal
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setPhotoSwipeOpen(true);
  };

  // Function to fetch more memes when scrolling to the bottom of the page
  const handleGalleryScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchMemesData();
    }
  };

  // Function to close the photo swipe modal
  const handleClosePhotoSwipe = () => {
    setPhotoSwipeOpen(false);
  };

  // Effect to fetch memes data on component mount and add scroll event listener
  useEffect(() => {
    fetchMemesData();

    // Add scroll event listener for infinite scrolling
    window.addEventListener("scroll", handleGalleryScroll);

    // Remove scroll event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleGalleryScroll);
    };
  }, [afterToken]);

  // Render the component with meme gallery and photo swipe modal
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Meme Gallery</h1>
      <div className={styles.gallery}>
        {memesList.map((meme, index) => (
          <div
            key={meme.id}
            className={styles.memeCard}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={meme.thumbnail}
              alt={meme.title}
              className={styles.thumbnail}
            />
            <p className={styles.memeTitle}>{meme.title}</p>
          </div>
        ))}
      </div>

      {isPhotoSwipeOpen && (
        <MemePhotoswipe
          memesList={memesList}
          selectedImageIndex={selectedImageIndex}
          onClose={handleClosePhotoSwipe}
        />
      )}
    </div>
  );
};

export default Memes;
