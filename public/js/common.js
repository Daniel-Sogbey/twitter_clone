$("#postTextarea").keyup(event => {
	let textBox = event.target;
	let value = textBox.value.trim();
	console.log(value);

	let submitPostButton = $("#submitPostButton");

	if (value == "") {
		submitPostButton.prop("disabled", true);
		return;
	}
	submitPostButton.prop("disabled", false);
});
