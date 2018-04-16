$(document).ready(function () {

    //make new grid upon user's inputs
    function makeGrid() {
        //store grid's height value on user input
        let height = $("#inputHeight").val();
        //store grid's width value on user input
        let width = $("#inputWidth").val();
        //store grid's output
        let table = $("#pixelCanvas");

        //clear all child nodes from table parent to prevent appending new tables to previous one
        //allow new grid to be created after each user's new input
        table.children().remove();

        //create grid from height and width's values whilst appending rows and cells as children's nodes to parent 'table'
        for (row = 0; row < width; row++) {
			table.append('<tr></tr>');
			for (cell = 0; cell < height; cell++) {
				table.children().last().append('<td></td>');
			}
		}
	}

	//on button click add background-color CSS property to <td> (single cell) with stored color value upon following rules:
	//1st - if on <td> click, color value on #colorPicker matches CSS background-color property, change <td>'s CSS background-color to predefined color value
	//2nd - if on <td> click, color value on #colorPicker differs CSS background-color property, change <td>'s CSS background-color to new user's chosen color value input
	$('#pixelCanvas').on('click', 'td', function() {
		let colPickVal = $("#colorPicker").val();
		$(this).css('background-color', colPickVal);
	});

	$('#pixelCanvas').on('dblclick', 'td', function() {
		let colPickVal = $("#colorPicker").val();
		$(this).css('background-color', '');
	});

	//paint on mousedrag
	let mouseIsDown = false;
	$("#pixelCanvas").mousedown(function(){
		mouseIsDown = true;
	});

	$("#pixelCanvas").mouseup(function(){
		mouseIsDown = false;
	});

	$("#pixelCanvas").on('mousemove', 'td', function(){
		if(mouseIsDown === true){
			$(this).css('background-color', $("#colorPicker").val());
		}
	});

	//on button click delete grid
	$("#buttonReset").on('click', function(event) {
		$("#pixelCanvas").empty();
		event.preventDefault();
	});

	//on button click, restart program whilst calling makeGrid() function;
	$("#sizePicker").submit(function(event) {
        //prevent browser's default behaviour (immediate page refresh upon button click)
        event.preventDefault();
        makeGrid();
	});
});