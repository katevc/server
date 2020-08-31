## SOLSTICE Content Management System Back-end

### Running Locally:

NOTE: this project works in conjunction with the client repo and without running the client at the same time, you will have limited functionality by only running this project locally. Essentially, if you only ran the server back-end, you will be able to see the json object returned that contains all of the news entries from the database, but it will be unformatted and you will not be able to add/delete entries. With that said, make sure to get the client running and check out the README in the repo for client to learn more.

To get this backend running locally (i.e. ensure that you are connected to our solstice database), you will need to be connected to Michigan's VPN service (https://its.umich.edu/enterprise/wifi-networks/vpn/getting-started). This is critical - you will not be able to access the database without the VPN set-up. Don't skip this step!

Once connected to UofM's VPN, change directories to the src folder within this project. Then, to run, use the command `node index.js` in command line. If this executes successfully, you should see "App running on port 8080." 

Now that your server project is set up locally, get the client running for full functionality!

### Uploading to Openshift
Within this repo, you can find a dockerfile, which outlines how the image we will upload to Openshift is built.

After logging in to the solstice project in Openshift, use the new-app command to upload the image to that project.

Make sure to create a route to the server (either in the openshift web app or via command line in your new-app command). This route is necessary to connect your server and client pods in Openshift. A route is not equivalent to the pod's hostName and should be in the format of an actual link (ex: the format generally will be "http://{some text}.umich.edu").
