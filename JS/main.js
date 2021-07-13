const video = document.getElementById('video');

function startvideo() {
    navigator.getUserMedia = (navigator.getUserMedia ||
         navigator.webkitGetUserMedia || 
         navigator.mozGetUserMedia || 
         navigator.msGetUserMedia);
    navigator.getUserMedia(
        {video: {}},
        stream => video.srcObject = stream,
        err => console.log(err)
    )
}
startvideo();

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models')
]).then(startvideo);


video.addEventListener('play', () =>{
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height};
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async() =>{
        const detection = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizeDetention = faceapi.resizeResults(detection, displaySize);
        canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);
        
        faceapi.draw.drawDetections(canvas, resizeDetention);
        faceapi.draw.drawFaceLandmarks(canvas, resizeDetention);
        faceapi.draw.drawFaceExpressions(canvas, resizeDetention);
    }, 100);
})