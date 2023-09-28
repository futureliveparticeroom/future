const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');


app.set('view engine', 'ejs');


app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const videosDir = path.join(__dirname, 'public', 'videos');
    fs.readdir(videosDir, (err, files) => {
        if (err) return res.status(500).send('Error reading videos directory');
        
        const videoFiles = files.filter(file => 
            !file.startsWith('.') && // 排除以 . 開頭的文件，比如 .DS_Store
            ['.mp4', '.webm'].includes(path.extname(file)) // 只包含視頻文件擴展名的文件
        ).slice(0, 4).map(file => `/public/videos/${file}`);
        
        res.render('index', { video: videoFiles });
    });
});

app.get('/get-latest-videos', (req, res) => {
    const videosDir = path.join(__dirname, 'public', 'videos');
    fs.readdir(videosDir, (err, files) => {
        if (err) return res.status(500).send('Error reading videos directory');
        
        const videoFiles = files.filter(file => 
            !file.startsWith('.') && // 排除以 . 開頭的文件，比如 .DS_Store
            ['.mp4', '.webm'].includes(path.extname(file)) // 只包含視頻文件擴展名的文件
        ).slice(0, 4).map(file => `/public/videos/${file}`);
        
        res.json(videoFiles);
    });
});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'public', 'uploads')); // 指定上傳文件的存儲路徑
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage });

  
  app.get('/uploadpage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'upload.html'));
  });
  

  app.post('/upload', upload.single('video'), (req, res) => {
    if (!req.file) {
        return res.redirect('/error.html');
    } 

    const uploadedVideoPath = req.file.path; // uploaded file's path
    const processedVideoPath = path.join(__dirname, 'public', 'videos', Date.now() + '.webm'); // ffmpeg processed file's path
    
    ffmpeg(uploadedVideoPath)
        .toFormat('webm')
        .on('end', () => {
            fs.unlinkSync(uploadedVideoPath); // optionally delete the uploaded file after processing if needed
            res.sendFile(path.join(__dirname, 'public', 'success.html'));
        })
        .on('error', (err) => {
            console.error(err);
            res.redirect('/error.html');
        })
        .save(processedVideoPath); // save to 'videos' directory
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});