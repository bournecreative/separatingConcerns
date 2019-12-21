# Separating Concerns

Vanilla JS web app used to demonstrate separation of concerns. Overall this application is not very useful, but it has solidified the principal of separating business logic from the views.

## How the App Works

When loaded, the page loads a list of cats and a featured section that highlights the current selection. The first cat in the list is featured on page load. Selecting other cats in the list will update the information in the featured section. When the featured cat image is 'Clicked', its cat count increments.

The admin button opens an area with input fields related to the current featured cat. The input values display the data currently stored in the model for the given cat. User may update the information or cancel out of the display.


## Structure

This web app is set up to ensure the view and model never directly communicate.


Model:  object literal that contains all relevant data that is displayed.

Controller:  business logic between views and the model

Views:

stageView:  main view creates and renders main display of larger hero image, title, and click count.

listView:  view that creates and renders list display.

adminView: display input fields with values that correlate to current featured item. New information may be submitted or canceled.


