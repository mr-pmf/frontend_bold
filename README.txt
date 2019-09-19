-Run "npm start" to Start

-First Screen is a Simple Dummy Login Form Without Validation. Simply Press Login to Continue
-Project Initializes With 2 Records Already Defined
-User May Add More Records or Edit/See Details of Existing Records
-User May Filter Records by Name, Brand, Vineyard, Year or Alcohol Percentage
--In Order to Search by Year Or Alcohol % You Must Input a Number. Anything Else Requires a Letter/Word Input
--Filter Inputs Are Case Sensitive! (Searching "M" Will Look For Records With "M"'s But Not With "m").
---Same Applies to Certain Characters (e.g. Searching "à" Will Not Look For Records With "a") 
-User May Also Order Records Alphabetically or From Biggest to Lowest (Only For Year And Alcohol %) by Clicking Down Arrow on Each Table Headers

Notes:
-Upon Adding or Editing a Record, a Snackbar Pops Up Indicating a Successful Action
-Clicking Logout Returns User to The Dummy Login Form
-When Edditing or Adding a Bottle, The Mandatory Fields Must Be Filled.
--If Not, a Warning Appears, Indicating The Tab And The Field Missing
-Records Are Stored on LocalStorage
--In Order To Filter by Year And Alcohol %, These Values Are Stored as String