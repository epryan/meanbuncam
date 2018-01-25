# Capture Daemon to snap bunny pictures on a timer

# Currently quite shell-like and needs to be refactored for:
#   -better control of time cycle (eg. dont take pictures when they will turn out dark)
#   -better control of image before creation (eg. delete if too dark/small)
#   -better daemon behaviors (eg. convert to cron job)
#   -better utilization of DB connection (ie. remove db dependency, save to db when online)

import os, sys, time, pymongo
from pymongo import MongoClient

# Connection to the MongoDB instance tailored for the BunCam
client = MongoClient('localhost', 27017)
db = client.dev_db
webcamimageschemas = db.webcamimageschemas

pic_path = '../public/bunpics/'
thumb_path = '../public/bunpics/thumbs/'

while True:
    # Utilizing ISO 8601 standard YYYY-MM-DDT00:00:00 for datetime
    file_name = time.strftime('%Y-%m-%dT%H:%M')
    extension = '.jpg'

    # Capture an image from the raspberry pi camera via:
    #   raspistill -h 1080 -w 1920 -q 100 -vf -hf -o /path/file_name
    capture_command = 'raspistill -h 1080 -w 1920 -q 100 -vf -hf -o ' + pic_path + file_name + extension

    # Convert the picture into a thumbnail via:
    #   exiftool -b -ThumbnailImage /picpath/file_name > /thumbpath/thumb_file_name
    thumbnail_command = 'exiftool -b -ThumbnailImage ' + pic_path + file_name + extension + ' > ' + thumb_path + 'thumb_' + file_name + extension

    # Run each command in turn (image then thumbnail)
    os.system(capture_command)
    os.system(thumbnail_command)

    # Save the metadata to Mongo
    bunpic = {
        'file_name': file_name + extension,
        'date', file_name,
        'type': 'jpg'
        }
    webcamimageschemas.insert_one(bunpic)

    # Wait for five minutes inbetween captures
    time.sleep(300)

    # TESTING
    # The current path values only work when CWD is services/
    # print(os.listdir(pic_path))
    # print(os.listdir(thumb_path))
    # print(file_name)
