---
layout: page
title: Documentation
---

## Data management

- the data is managed in a [Google Sheet](https://docs.google.com/spreadsheets/d/1h8iZt6ceY0YvhZryutdLVoaU6H3WONkZssaew_hxb9I). It is updated via a [Google Form](https://docs.google.com/forms/d/1z9oOI93xfNi7I8pzawDH5w6IquFcG8o4ej9POvISXCk/edit). These belong to the win-eap Google account.
- to populate the demo website, the Sheet is downloaded as ```csv``` and saved as ```_data/resources.csv```
- Note that the question titles in the Google Form become the column headings in the csv file, and therefore should not be changed. If they are changed, the processing code in ```index.markdown``` will have to be changed accordingly.

### Data structure

- The site depends on metadata with controlled vocabularies for the two sections that are used to select services that meet a given user's needs:
  - **resources**: organizations that provide services; represented by entries in the form, and by rows in the Sheet and in the csv.
  - **services**: specific services provided by an organization, e.g. "Food and Clothing". These are listed in the "Type of program" section of the form, and therefore in the "Type of program" column of the csv. 
  - **eligibility**: characteristics which qualify or disqualify a user from using a resource. In the "Eligibility" question are listed the characteristics which users **must** have to use the resource; in the "Exclusions" question are listed the characteristics they **must not** have. 
- **Note: service and eligibility names must not contain commas.** The csv uses commas to separate names in the list, and would be confused by commas in the names.
  - note also that changing the question title in the form does not update the entries in the spreadsheet: they will have to updated by search-and-replace or by hand.
  
  ### Resource selection form
  
  - when the list of resources is built, each resource is given a css class for each service it provides and for each must and must-not that applies to it. These classes are used to hide disqualified resources based on the selections that the user makes. For example, if you select the service "Food and Clothing", every resource that does not have the class ```service-food-and-clothing``` will be hidden. The same applies to "must" characteristics. For "must-not" characteristics, the opposite applies: resources that **do** have the characteristic are hidden.
  - the default setting for a characteristic is "may", which means resources will not be hidden on its account