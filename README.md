# mbta-display

This application uses the [mbta's API](https://www.mbta.com/developers/v3-api) to display North Station's departures like so: https://commons.wikimedia.org/wiki/File:North_Station_departure_board.JPG.
Notes:
* Since data is retrieved from the mbta, AMTRACK departures are not shown.
* The page does not have live updates so you must manually reload the page to see changes.
* The status and track number are driven by the predictions endpoint. Sometimes there's a weird state where a prediction containing an updated status is received, i.e. "Now Boarding" but the track number has not been updated yet.

You can see the live versions here:
- [Hosted with Heroku](https://mbta-display.herokuapp.com/)
- [Hosted with AWS](http://nlailler-mbta-display.s3-website-us-east-1.amazonaws.com/)
