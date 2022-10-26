$( document ).ready(function(){
	$.get( "songs.json", function( data ) {
	
	// print songs in a user friendly way
	// can use any source, so data or an array etc.
	// always prints to #data
	function printSongs(source){
		strHTML= "";
		source.forEach(function(song) {
		strHTML += "<br/>" + song.title + "<br/>"
				+ "Artist: " + song.artist + "<br/>"
				+ "Genre(s): " + song.genres + "<br/>"
				+ "Released " + song.year + "<br/>";
		});
		$('#data').html(strHTML)
	}
	
	// create the selector with options taken from data
	function makeSelector(){
		// initially genres is set to All
		var allGenres = ["All"];
		// add opening select tag
		var toAppend = '<select name="chooseGenre" id="genreChoice">';
		// go through each song
		// if the genre is not in allGenres, add it
		// otherwise nothing
		data.forEach(function(song){
			for (i = 0; i < song.genres.length; i++) {
				if(allGenres.indexOf(song.genres[i]) < 0){
					allGenres.push(song.genres[i]);
				}
			}
		});
		// loop through allGenres and add each one as a selector option
		for(j = 0; j < allGenres.length; j++){
			toAppend += '<option value="' + allGenres[j]
					 + '">' + allGenres[j] + '</option>';
		}
		// close selector tag
		toAppend += "</select>";
		// append to select div
		$('#select').append(toAppend);
	}

	function filterGenres(){
		// get choice from selector
		var genre = $('select[name="chooseGenre"]').val();
		var toPrint = [];
		data.forEach(function(song){
			for (i = 0; i < song.genres.length; i++) {
				// if genre matches, add it
				if(song.genres[i] == genre){
					toPrint.push(song);
				// if choice is All, add all songs
				} else if (genre == "All"){ 
					toPrint.push(song);
				}
			}
		});
		// make sure div is empty before printing
		$('#data').empty();
		printSongs(toPrint);
	}

	// print songs, make selector, and assign filterGenres to button
	printSongs(data);
	makeSelector();
	$('#filter').on('click',filterGenres);

	});
});