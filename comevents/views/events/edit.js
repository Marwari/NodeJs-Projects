extends ../../layouts/default

block head
	title Add Event

block body
	div.row
		dov.col-sm-8
			div.page-header
				h1 Add Event
				form(method='post', action='/events/update/#{event._id}')
					div.form-group
						label Event Name:
						input.form-control(type='text', name='name')
					div.form-group
						label Event Description:
						textarea.form-control(type='text', name='description')
					div.form-group
						label Venue:
						input.form-control(type='text', name='venue')
					div.form-group
						label Event Date:
						input.form-control(type='date', name='date')
					div.form-group
						label Start Time:
						input.form-control(type='time', name='startTime')
					div.form-group
						label End Time:
						input.form-control(type='time', name='endTime')
					div.form-group
						button.btn.btn-primary.btn-signup(type='submit') Create Event
		div.com-sm-4
			div.page-header
				h1 Sidebar