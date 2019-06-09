# Cycle Heaven
<p>
# Link to Cycle Heaven app: [Cycle Heaven](https://cycle-heaven.herokuapp.com/)
</p>

## Front End Overview
<p>
Cycle Heaven [Back End Overview](https://github.com/RomanBogatikov/cycle_heaven_app_api)
</p>

<p>
Cycle Heaven is an online store for selling bicycles.
</p>


### Technologies Used:
<ul>
  <li>ReactJS (including advanced features like: Context, Session Handling with Higher Order Components, Protected Routes with Authorization, Code Splitting)</li>
  <li>Styled Components (for the red buttons that filter bicycles by category)</li>
  <li>Material Design for Bootstrap (React version) to style navigation bar</li>
  <li>ChartJS (to visualize the sales dynamic)</li>
  <li>Scalable Vector Graphics (made a picture of a loading ring in the form of a bicycle wheel)</li>
  <li>@keyframes animations</li>
  <li>Promises chaining (to display loading ring while fetching bicycles from the PostreSQL database)</li>
  <li>LocalStorage (to save user cart if the window is closed)</li>
</ul>

## Back End Overview
### Technologies Used:

* Ruby on Rails to set up routes
* Firebase to manage users (authenticate, authorize, store sensitive information)
* PostgreSQL to store products (set up many-to-many relationship between all available bicycles and bicycles in each user's cart)


## User stories:

* Landing page displays a list of bicycles for sale. The user can filter bicycles by category (mountain, road, touring) and by brand (search bar)
![Landing Page](./images_readme/landing.png)


