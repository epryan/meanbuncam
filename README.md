# PiBunCam

## A MEAN stack web app to host content from a Raspberry Pi based "bunny cam"

* **Usage**
	- Clone the repo
	- Create database folders (eg. meanbuncam/data/db)

	- npm install
	- pip install pymongo

	- Optional: Import any existing images into meanbuncam/public/bunpics/ (of required format)
	- Optional: Eliminate images below the size threshold (indicating a mostly dark image)
			  	- (from meanbuncam/services/) node piccleaner.js 
	- Optional: Run the populatedb.py 
			  	- (from meanbuncam/services/) python populatedb.py

	- Spawn the mongod instance to handle db connections
		- mongod --fork --logpath /var/log/mongodb.log

	- Spawn the capture daemon to snap pictures on a timer
		- nohup captured.py

	- Start the web app!
		- node app.js
		- or
		- DEBUG=meanbuncam:* npm run devstart
