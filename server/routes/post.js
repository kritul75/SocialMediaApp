const express= require('express');
const multer = require('multer');
const path= require('path');
const fs= require('fs');
const postModel= require("../models/postModels");

const app= express();

var upload= multer({dest:"./uploads"});

function generateRandomNumber(){
    return Math.floor(100000 + Math.random() * 900000);
}
// fecth all posts
// @ GET req
app.get("/fetchAllPosts",async (req,res)=>{
    try {
        const data= await postModel.find();
        const modifiedData= await Promise.all(data.map((post)=>{
            // Read video file content
            const newObj={...post};
            const videoContent= fs.readFileSync(post.imgPath);
            console.log("path",post.imgPath);
            // convert the video content to base64
            const base64Video = videoContent.toString('base64');
            newObj.postBase64 = base64Video;
            return newObj;
        }))
        res.status(200).send(modifiedData);
    } catch (error) {
        console.log("Error",error);
        res.status(500).send({message:error});
    }
})

// Upload Image
// @ POST req
app.post('/upload',upload.single('images'),(req,res)=>{
    try {
       const imageBlob = req.file;
       const imageName = `${req.body.name}`;
       const userId    = req.body.userId; 
       
       //Create directory if it doesn't exist
       const uploadDir = path.join(__dirname,'uploads');
       if(!fs.existsSync(uploadDir)){
         fs.mkdirSync(uploadDir);
       }
       // construct image path
       const randomSixDigitNumber = generateRandomNumber();
       // test line -2
       
       
       const imagePath = path.join(uploadDir,`${imageName}-${randomSixDigitNumber}.png`);
       // Read the file buffer and convert to base64
       const fileBuffer = fs.readFileSync(imageBlob.path);
       const base64Image = fileBuffer.toString('base64');
       //let base64Image = imageBlob.split(';base64,').pop();

       // write image data to file
       fs.writeFile(imagePath,base64Image,{encoding: 'base64'},async(err)=>{
          if(err){
            console.error('Error saving image:', err);
            return res.status(500).send('Failed to save image.');
          }
          const postdata = new postModel({
            imgPath: imagePath,
            name: imageName,
            format: "image",
            desc: req.body.desc,
            likes: req.body.likes,
            liked: req.body.liked,
            userId : req.body.userId
          });
          await postdata.save();

          console.log('Image saved successfully:',imagePath);
          res.status(200).send('Image uploaded successfully.');
       })
    } catch (error) {
        console.log("Error",error);
        res.status(500).send({message:error});
    }
})

// Upload video
// @ POST req
app.post('/upload/video',upload.single('video'),(req,res)=>{
    try {
      
        const imageBlob = req.file;
        const imageName = `${req.body.name}`;

        // Create directory if it doesn't exist
        const uploadDir = path.join(__dirname, 'uploads/video');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir);
        }

        // Construct image path
        const randomSixDigitNumber = generateRandomNumber();

        const imagePath = path.join(uploadDir, `${imageName}-${randomSixDigitNumber}.mp4`);
        // Read the file buffer and convert to base64
        const fileBuffer = fs.readFileSync(imageBlob.path);
        const base64Image = fileBuffer.toString('base64');
        //let base64Image = imageBlob.split(';base64,').pop();

        // Write image data to file
      fs.writeFile(imagePath, base64Image, { encoding: 'base64' }, async (err) => {
        if (err) {
          console.error('Error saving image:', err);
          return res.status(500).send('Failed to save image.');
        }
        const postdata = new postModel({
          imgPath: imagePath,
          name: imageName,
          format: "video",
          desc: req.body.desc,
          likes: req.body.likes,
          liked: req.body.liked,
          userId : req.body.userId
        });
        await postdata.save();
  
        console.log('Video saved successfully:', imagePath);
        res.status(200).send('Video uploaded successfully.');
      })
    } catch (err) {
        console.log("Error ", err)
        res.status(500).send({ message: err })
    }
})


module.exports = app;