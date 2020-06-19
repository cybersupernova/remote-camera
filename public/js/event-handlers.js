(function () {
	console.log('placing handlers')

	/* name submit handler */
	var nameForm = document.getElementById('name-form')
	nameForm.addEventListener('submit', function ($event) {
		try {
			$event.preventDefault()
			var name = document.getElementById('name').value
			if (name.length <= 0) {
				alert("name is required")
				return
			}
			window.remoteCamera.io.emit('REGISTER', name)
			nameForm.style.display = 'none'
		} catch (error) {
			console.log(error)
		}
	})
})()