let pc1;
let pc2;
let startTime;

const offerOptions = {
  offerToReceiveAudio: 1,
  offerToReceiveVideo: 1,
};

function getOtherPc(pc) {
  return pc === pc1 ? pc2 : pc1;
}

export async function start(localVideoRef, localStream) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
  localVideoRef.current.srcObject = stream;
  localStream.current = stream;
}

export async function call(localStream, remoteVideoRef) {
  startTime = window.performance.now();
  const configuration = {};
  pc1 = new RTCPeerConnection(configuration);
  pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e));
  pc2 = new RTCPeerConnection(configuration);
  pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e));
  pc2.addEventListener('track', gotRemoteStream);
  localStream.current
    .getTracks()
    .forEach(track => pc1.addTrack(track, localStream.current));
  const offer = await pc1.createOffer(offerOptions);
  await onCreateOfferSuccess(offer);

  //
  async function onCreateOfferSuccess(desc) {
    await pc1.setLocalDescription(desc);
    await pc2.setRemoteDescription(desc);
    const answer = await pc2.createAnswer();
    await onCreateAnswerSuccess(answer);
  }

  function gotRemoteStream(e) {
    if (remoteVideoRef.current.srcObject !== e.streams[0]) {
      remoteVideoRef.current.srcObject = e.streams[0];
    }
  }

  async function onCreateAnswerSuccess(desc) {
    await pc2.setLocalDescription(desc);
    await pc1.setRemoteDescription(desc);
  }

  async function onIceCandidate(pc, event) {
    await getOtherPc(pc).addIceCandidate(event.candidate);
  }
}

export function hangup() {
  pc1.close();
  pc2.close();
  pc1 = null;
  pc2 = null;
}