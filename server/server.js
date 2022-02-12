const path = require('path')
const imageDirectory = path.join(__dirname, "public", "qrcodes")
const jsonFile = path.join(__dirname, "public", "courses.json")

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const fs = require('fs')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDirectory)
  },
  filename: (req, file, cb) => {
    cb(null, req.body.subject + req.body.number + '-' + file.originalname);
  }
})
const upload = multer({ storage })

app.post('/', upload.single('qrcode'), (req, res) => {
  fs.readFile(jsonFile, (err, data) => {
    if (err) return console.log(err)
    const courses = JSON.parse(data.toString())
    let add = true
    for (let course of courses.data) {
      if (course.subject === req.body.subject && course.number === req.body.number) {
        if (course.qrcode !== req.file.originalname) {
          fs.unlink(path.join(imageDirectory, req.body.subject + req.body.number + '-' + course.qrcode), (err) => {
            if (err) console.log(err)
          })
          course.qrcode = req.file.originalname
        }
        add = false
        break
      }
    }
    if (add) {
      req.body.qrcode = req.file.originalname
      courses.data.push(req.body)
    }
    fs.writeFile(jsonFile, JSON.stringify(courses), (err, data) => {
      if (err) return console.log(err)
    })
  })
  console.log('finish')
})

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('server is running successfully.')
})
