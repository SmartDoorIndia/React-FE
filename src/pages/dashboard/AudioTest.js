/** @format */

import { useEffect } from 'react';

import AgoraRTC from 'agora-rtc-sdk';

const client = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
});

function AudioTest() {
  const onMute = () => {
    // client.muteLocalAudioStream(muted);
  };

  function onLeave() {
    client.leave(
        function() {
          console.log('client leaves channel');
          // ……
        },
        function(err) {
          console.log('client leave failed ', err);
          // error handling
        },
    );
  }
  useEffect(() => {
    // Handle errors.
    const handleError = function(err) {
      console.log('Error: ', err);
    };

    // Query the container to which the remote stream belong.
    const remoteContainer = document.getElementById('remote-container');

    // Add video streams to the container.
    function addVideoStream(elementId) {
      // Creates a new div for every stream
      const streamDiv = document.createElement('div');
      // Assigns the elementId to the div.
      streamDiv.id = elementId;
      // Takes care of the lateral inversion
      streamDiv.style.transform = 'rotateY(180deg)';
      // Adds the div to the container.
      remoteContainer.appendChild(streamDiv);
    }

    // Remove the video stream from the container.
    function removeVideoStream(elementId) {
      const remoteDiv = document.getElementById(elementId);
      if (remoteDiv) remoteDiv.parentNode.removeChild(remoteDiv);
    }

    client.init(
        '355539b5e0b448829c574b14c75e3e6e',
        function() {
          console.log('client initialized');
        },
        function(err) {
          console.log('client init failed ', err);
        },
    );

    // Join a channel
    client.join(
        '006355539b5e0b448829c574b14c75e3e6eIAA8qzwk6/Af6ZvTfdnBVzJ7c5OJWI8t971FhaAXqgkM+AvPDhsAAAAAEAC1GfqNatx/YAEAAQBq3H9g',
        's',
        null,
        (uid) => {
          const localStream = AgoraRTC.createStream({
            audio: true,
            video: false,
          });
            // Initialize the local stream
          localStream.init(() => {
            // Play the local stream
            localStream.play('me');
            // Publish the local stream
            client.publish(localStream, handleError);
          }, handleError);
        },
        handleError,
    );

    // Subscribe to the remote stream when it is published
    client.on('stream-added', function(evt) {
      client.subscribe(evt.stream, handleError);
    });
    // Play the remote stream when it is subsribed
    client.on('stream-subscribed', function(evt) {
      const stream = evt.stream;
      const streamId = String(stream.getId());
      addVideoStream(streamId);
      stream.play(streamId);
    });

    // Remove the corresponding view when a remote user unpublishes.
    client.on('stream-removed', function(evt) {
      const stream = evt.stream;
      const streamId = String(stream.getId());
      stream.close();
      removeVideoStream(streamId);
    });
    // Remove the corresponding view when a remote user leaves the channel.
    client.on('peer-leave', function(evt) {
      const stream = evt.stream;
      const streamId = String(stream.getId());
      stream.close();
      removeVideoStream(streamId);
    });

    return () => {
      onLeave();
      client.off('stream-added');
      client.off('stream-subscribed');
      client.off('stream-removed');
      client.off('peer-leave');
    };
  }, []);

  return (
    <div>
      <h1>
        Voice Call
        <br />
        <small style={ { fontSize: '14pt' } }>Powered by Agora.io</small>
      </h1>
      <h4>Local video</h4>

      <button
        onClick={ () => {
          onLeave();
        } }>
        Leave
      </button>

      <div id="me"></div>
      <h4>Remote video</h4>
      <div id="remote-container"></div>
    </div>
  );
}

export default AudioTest;
