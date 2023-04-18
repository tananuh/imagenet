requirejs.config({
    baseUrl: 'js',
    paths: {
        '@tensorflow/netjs': 'lib/mobilenet.min',
        '@tensorflow/tfjs': 'lib/tensorflow.min',
        '@teachablemachine/image': 'lib/teachablemachine-image.min',
        'jquery': 'lib/jquery.min',
        'image-recognition': 'app/app',
        'ml5': 'lib/ml5.min',
        'image-ml5-recognition': 'app/appml5',
        
    }
});
require(["image-ml5-recognition"], function(recognition) {
    recognition.recognition();
})