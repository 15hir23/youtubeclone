import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VideoCall.css';

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [localStream, setLocalStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [screenStream, setScreenStream] = useState(null);
  const [inviteLink, setInviteLink] = useState('');
  const navigate = useNavigate();
  
  const servers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      {
        urls: 'turn:your-turn-server.com',
        username: 'user',
        credential: 'password'
      },
    ],
  };

  useEffect(() => {
    const startVideoCall = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const pc = new RTCPeerConnection(servers);
        setPeerConnection(pc);

        stream.getTracks().forEach(track => pc.addTrack(track, stream));

        pc.onicecandidate = event => {
          if (event.candidate) {
            console.log('New ICE candidate:', event.candidate);
            // Send the candidate to the remote peer via signaling server
          }
        };

        pc.ontrack = event => {
          if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
            remoteVideoRef.current.srcObject.addTrack(event.track);
          } else if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = new MediaStream([event.track]);
          }
        };

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const answer = await simulateSignalingExchange(offer);
        await pc.setRemoteDescription(answer);
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    const simulateSignalingExchange = async (offer) => {
      const remotePeerConnection = new RTCPeerConnection(servers);

      remotePeerConnection.onicecandidate = event => {
        if (event.candidate) {
          peerConnection.addIceCandidate(event.candidate).catch(console.error);
        }
      };

      remotePeerConnection.ontrack = event => {
        if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
          remoteVideoRef.current.srcObject.addTrack(event.track);
        } else if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = new MediaStream([event.track]);
        }
      };

      localStream.getTracks().forEach(track => remotePeerConnection.addTrack(track, localStream));

      await remotePeerConnection.setRemoteDescription(offer);
      const answer = await remotePeerConnection.createAnswer();
      await remotePeerConnection.setLocalDescription(answer);

      return answer;
    };

    startVideoCall();

    return () => {
      if (peerConnection) {
        peerConnection.close();
        localStream.getTracks().forEach(track => track.stop());
      }
      if (remoteVideoRef.current && remoteVideoRef.current.srcObject) {
        remoteVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [localStream, peerConnection]);

  useEffect(() => {
    if (isCallEnded) {
      closeCall();
    }
  }, [isCallEnded]);

  const closeCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (peerConnection) {
      peerConnection.close();
    }
    navigate('/');
  };

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false
      });

      setScreenStream(stream);
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing screen media:', error);
    }
  };

  const stopScreenSharing = () => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }
    }
  };

  const generateInviteLink = () => {
    const link = `${window.location.origin}/join?room=${Math.random().toString(36).substr(2, 9)}`;
    setInviteLink(link);
  };

  return (
    <div className="container">
      <h1>Video Call Page</h1>
      <div className="video-container">
        <video ref={localVideoRef} autoPlay playsInline></video>
        <video ref={remoteVideoRef} autoPlay playsInline></video>
      </div>
      <div className="controls">
        <button className="button" onClick={startScreenSharing}>Share Screen</button>
        {screenStream && <button className="button" onClick={stopScreenSharing}>Stop Sharing</button>}
        <button className="button" onClick={generateInviteLink}>Invite Friends</button>
        <button className="button" onClick={() => setIsCallEnded(true)}>End Call</button>
      </div>
      {inviteLink && (
        <div className="invite-link">
          <p>Invite Link: <a href={inviteLink}>{inviteLink}</a></p>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
