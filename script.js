const vidoeElement = document.getElementById('video');
const button = document.getElementById('button');

// sreen capture api
// Prompt to select media stream, pass to video element, then play.
async function selectMedia() {
  try {
    // assign mediaStream to whichever screen/window that user selected to share
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    // pass mediaStream into video object as its source/value of object
    vidoeElement.srcObject = mediaStream;
    // when video has loaded metadata , call a fuction to play a video
    vidoeElement.onloadeddata = () => {
      vidoeElement.play();
    }
  } catch (error) {
    console.log('whoops, error in select media', error)
  }
}

// On Load
selectMedia();