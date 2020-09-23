const videoElement = document.getElementById('video');
const buttonSelect = document.getElementById('button-select');
const buttonShare = document.getElementById('button-share');

buttonShare.style.display = 'none';
let mediaStream;
// sreen capture api
// Prompt to select media stream, pass to video element, then play.
async function selectMedia() {
  try {
    // assign mediaStream to whichever screen/window that user selected to share
    mediaStream = await navigator.mediaDevices.getDisplayMedia();

    // pass mediaStream into video object as its source/value of object
    videoElement.srcObject = mediaStream;
    // when video has loaded metadata , call a fuction to play a video
    videoElement.onloadeddata = () => {
      videoElement.play();
    }

  } catch (error) {
    console.log('whoops, error in select media', error)
    buttonShare.style.display = 'none';
  }
}

buttonSelect.addEventListener('click', async () => {
  await selectMedia();

  buttonShare.innerText = 'Play PIP Mode';
  buttonShare.style.display = 'block';
});

let mediaStreamTrack;
const stopMediaStreamOn = () => {
  mediaStreamTrack = mediaStream.getVideoTracks();
  // mediaStreamTrack && mediaStreamTrack[0].stop();
  // mediaStreamTrack[0].stop();
  mediaStreamTrack.forEach(media => media.stop());
};

// SHARE / STOP BUTTON
let isShared = true;
buttonShare.addEventListener('click', async () => {
  mediaStreamTrack = mediaStream.getVideoTracks();
  console.log('mediaStreamTrack', mediaStreamTrack)
  // Disable Button
  // buttonShare.disabled = true;*******
  // Start Picture in Picture
  if (isShared) {
    await videoElement.requestPictureInPicture();
    buttonShare.innerText = 'Stop PIP Mode';
    isShared = false;
  } else {
    // console.log('before exit', isShared)
    // await document.exitPictureInPicture();
    isShared = true;
    // console.log('after exit', isShared)
    stopMediaStreamOn();
    document.exitPictureInPicture();
    buttonShare.style.display = 'none';
  }

  // Reset BUtton after successfully requestPictureInPicture, otherwise button will remain disabled
  // buttonShare.disabled = false; ***********
});

