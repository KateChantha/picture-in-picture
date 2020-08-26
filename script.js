const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// sreen capture api
// Prompt to select media stream, pass to video element, then play.
async function selectMedia() {
  try {
    // assign mediaStream to whichever screen/window that user selected to share
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    // pass mediaStream into video object as its source/value of object
    videoElement.srcObject = mediaStream;
    // when video has loaded metadata , call a fuction to play a video
    videoElement.onloadeddata = () => {
      videoElement.play();
    }
  } catch (error) {
    console.log('whoops, error in select media', error)
  }
}

button.addEventListener('click', async () => {
  console.log("CLICK!!!!")
  // Disable Button
  button.disabled = true;
  // Start Picture in Picture
  await videoElement.requestPictureInPicture();
  // Reset BUtton after successfully requestPictureInPicture, otherwise button will remain disabled
  button.disabled = false;
})

// On Load
selectMedia();