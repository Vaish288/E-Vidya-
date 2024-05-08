import React from "react";

const GuestLogin = () => {
  return (
    <div>
      <p>Welcome to guest login</p>
      {/* Add your video component here */}
      <video controls>
        <source src="your_video_source_here.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Add links for Metamask and cryptocurrency basics */}
      <p>Learn how to use Metamask accounts:</p>
      <a href="link_to_metamask_tutorial">Metamask Tutorial</a>
      <p>Learn basics about cryptocurrency:</p>
      <a href="link_to_crypto_basics">Cryptocurrency Basics</a>
    </div>
  );
};

export default GuestLogin;
