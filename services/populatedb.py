import os, pymongo
from pymongo import MongoClient

# Connection to the MongoDB instance tailored for the BunCam
client = MongoClient('localhost', 27017)
db = client.dev_db
webcamimageschemas = db.webcamimageschemas

# Image and Thumbnail Paths
pic_path = '/home/pi/meanbuncam/public/bunpics'
thumb_path = '/home/pi/meanbuncam/public/bunpics/thumbs'

# Gather the list of all images and thumbnails present on disk
pics = os.listdir(pic_path)
thumbs = os.listdir(thumb_path)

# Insert each image into the database (omitting the thumb folder)
for pic in pics:
    if pic != 'thumbs':
        bunpic = {
            'file_name': pic,
            'date': pic[:-4],
            'type': 'jpg'
            }
        webcamimageschemas.insert_one(bunpic)
