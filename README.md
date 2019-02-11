# Summary
 A full-stack MERN app. Concept consisted of 3 randomized questions to analyze the user's mood and provide a results page with conditional entertainment output based on the analysis. Due time constraints, we've pivoted to a direct mood question with a randomized entertainment output and a chart tracking the user's weekly mood.  

# Demo
Coming soon!

# Technologies Used
* Mongodb
* Express
* React
* Node

## React Components
* Auth components: success redirects to profile page
  * Login
  * Signup
* Layout components
  * Nav
  * Footer
* Home (stub): Landing page with app description.
* QuestionForm: Authorized route - logged in users only. Displays mood question and form.
* Profile: Authorized route - logged in users only. Displays user info, ability to edit user info and a chart tracking the user's mood throughout the week. 
  * ProfileEdit.js: Edit form to for user info.
* Results: Authorized route: logged in users only. Displays uplifting content and suggestions to improve/maintain user's daily mood. 
  * Food.js: Displays suggested restaurant information.
  * Restaurant.js:  displays suggested restaurant image.
  * Giphy.js:  Displays entertaining giphy.
  * Movie.js : Displays suggested movie and corresponding rating and description.
  * Output.js: Displays sayings output, normal/vulgar options available
  * Weather.js: Displays weather icon based on current weather description. 
  * WeatherTemp.js: Displays temperature based on user location.
* App.js


## Technical Notes

A single page application (SPA) that uses react-router and axios to interact with a very loosely coupled back-end. The back-end can sign up, log in, or verify a user using JSON web tokens (JWTs). Back-end also tracks user's response to mood question.

## Still To Do
* 
* 
* 
* 
* 
* 
* 
* 
* 


