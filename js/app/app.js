define([
    "jquery",
    "@tensorflow/tfjs",
    "@teachablemachine/image"
], function($, tf, tmImage) {
    'use strict';
    /**
     * Load model
     */
    return {
        recognition : function () {
            $(document).ready(function(){
                const fileInput = $('.imageInput #image');
                fileInput.change(function (e) {
                    const file = e.target.files[0];
                    startImageScan(file)
                    
                });
            
                // When the model is loaded
                function modelLoaded() {
                    console.log("Model Loaded!");
                }
                async function startImageScan(file) {
                    const URL = "js/app/net-data/";
                    const modelURL = URL + "model.json";
                    const metadataURL = URL + "metadata.json";
                    let model, webcam, labelContainer, maxPredictions;
                   
                    model = await tmImage.load(modelURL, metadataURL);
                    maxPredictions = model.getTotalClasses();
                    
                    
                    const imageresult = $('#uploadedImage');
                    const imageElement = new Image();
                    const querryresult = $(".imageResult");
                    imageElement.src = URL.createObjectURL(file);
                
                    // When image object is loaded
                    imageElement.onload = async function () {
                    // Set <img /> attributes
                        imageresult.attr({
                            'src': this.src,
                            'height': this.height,
                            'width': this.width
                            });
                        querryresult.html("...");
                        // Scan the uploaded image
                        await predict(imageElement, model, maxPredictions);
                    }          
                }

                async function predict(imageElement, model, maxPredictions) {
                    // predict can take in an image, video or canvas html element
                    const prediction = await model.predict(imageElement);
                    const querryresult = $(".imageResult");
                    for (let i = 0; i < maxPredictions; i++) {
                        const classPrediction =
                            prediction[i].className + ": " + prediction[i].probability.toFixed(2);
                            querryresult.html(classPrediction);
                    }
                }
            });
        }
    }
});


