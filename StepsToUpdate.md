## Steps to update NFT Metadata:
1) Navigate to the "backend" folder.
2) If you want to update Terms of Service:  
   1) navigate to `backend/scripts/update_metadata.py` and change the description contained there to include the new ToS. 
   2) Run this file to generate new .json files under the "json" folder. 
   3) In the command line, first cd to backend folder and then run `npm run upload_files`. This will take some time, and will upload the generated images as well as update the .json files you just created with the new ToS. 
3) If you want to update the Token performance points:
   1) Run `update_metadata.py`. This will calculate the token performance points for each user and do two things: 
      1) Update our database ("tokens" table) with the new data
      2) Update the json files with the new data
4) Once these changes have been made, upload the new metadata using the command: `npm run upload_metadata`