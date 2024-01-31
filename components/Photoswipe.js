import React, { useState } from "react";
import { PhotoSwipe } from "react-photoswipe";
import "react-photoswipe/lib/photoswipe.css";

// CustomPhotoSwipe component that displays a gallery using react-photoswipe
const CustomPhotoSwipe = ({ memesList }) => {
  // State variables to manage the state of the photo swipe gallery
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Function to open the photo swipe gallery at the specified index
  const openGallery = (index) => {
    setCurrentPhotoIndex(index);
    setIsGalleryOpen(true);
  };

  // Function to close the photo swipe gallery
  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  // Render the component with a list of clickable images
  return (
    <div>
      <div>
        {memesList.map((meme, index) => (
          <div key={meme.id} onClick={() => openGallery(index)}>
            <img src={meme.url} alt={meme.title} />
            <p>{meme.title}</p>
          </div>
        ))}
      </div>

      {/* Render the PhotoSwipe component when the gallery is open */}
      {isGalleryOpen && (
        <PhotoSwipe
          isOpen={isGalleryOpen}
          items={memesList.map((meme) => ({
            src: meme.url,
            w: 0,
            h: 0,
            title: meme.title,
          }))}
          options={{
            index: currentPhotoIndex,
            closeOnScroll: false,
          }}
          onClose={closeGallery}
        />
      )}
    </div>
  );
};

export default CustomPhotoSwipe;
