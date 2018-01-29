var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'http://www.myshiptracking.com/requests/vesseldetails.php?type=json&mmsi=701088000');
ourRequest.onload = function() {
	console.log(ourRequest.responseText);
};
ourRequest.send();