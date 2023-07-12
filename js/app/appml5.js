define([
    "ml5",
    "jquery"
], function(ml5, $) {
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

                function customModelLoaded(file) {
                    console.log("Custom Model Loaded!");
                       
                }


                function startImageScan(file) {
                    // Create a variable to initialize the ml5.js image classifier with MobileNet
                    // const classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/-dFiOBPSI/model.json", modelLoaded);
                    // const classifier = ml5.imageClassifier("https://tananuh.github.io/imagenet/netdata/model.json", modelLoaded);
                    // const classifier = ml5.imageClassifier("https://tuanhehe.mywire.org/imagenet/netdata/model.json", modelLoaded);
                    const classifier = ml5.imageClassifier("./netdata/model.json", modelLoaded);


                    // const mobilenet = ml5.featureExtractor("Mobilenet", modelLoaded);
                    // classifier = mobilenet.load("./netdata/model.json", customModelLoaded);


                   
                        const imageresult = $('#uploadedImage');
                        const imageElement = new Image();
                        const querryresult = $(".imageResult");
                        imageElement.src = URL.createObjectURL(file);
                    
                        // When image object is loaded
                        imageElement.onload = function () {
                        // Set <img /> attributes
                            imageresult.attr({
                                'src': this.src,
                                'height': this.height,
                                'width': this.width
                                });
                            querryresult.html("...");
                            // Scan the uploaded image
                            classifier.ready.finally(function() {
                                classifier.classify(imageElement, imageScanResult);
                            });
                        }   
                    
                    
                        
                }

                function imageScanResult(error, results) {
                    const querryresult = $(".imageResult");
                    if (error) {
                        querryresult.html(error);
                    } else {
                        let num = results[0].confidence * 100;
                        querryresult.html(results[0].label + " " + num.toFixed(0) + " % ");
                    }
                }
                
            });
        }
    }
});


