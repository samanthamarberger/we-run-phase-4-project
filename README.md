# We-Run application: React/Rails API

## Description

This web application was created for the purpose of allowing runners to post the trails they run with other users. 
The users have access to view all trails posted and comment on other trails. This Rails/ React, and JavaScript application 
includes the ability to view, edit, add, and delete trails, reviews, and users. Take a look at my application 
and play around with some of this functionalityu!

## Getting Started

### Make sure you have the following: 
- Ruby 2.7.4
- NodeJS (v16), and npm
- PostgreSQL database

**Note**: if you are wanting to deploy the application on Render: 
- Render account

See Environment Setup below for instructions on installing these tools if you
don't already have them.

### Setup

```console
# Clone the repository
$ git clone git@github.com:yourusername/project-application.git

# Change to the project directory
$ cd project-application.git

# Install dependencies
$ bundle install
$ npm install --prefix client

# To run the backend [http://localhost:3000](http://localhost:3000)
$ rails s

# To run the frontend on [http://localhost:4000](http://localhost:4000)
$ npm start --prefix client
```

## Features

This application has various classes and relationships between classes:

- users
- trails
- reviews

- The user has_many reviews and has_many trails, through reviews
- The trail has_many reviews and has_many users, through reviews
- The review belongs_to a user and belongs_to a trail

These relationships allow easy access to classes through other classes which makes building out functionality much easier.

My application utilizes Authorization and Authentication to secure the user data and make it user friendly. This allows for

- Login and Logout functionality
- The use of cookies

There is full CRUD capability for users, trails, and reviews in the Rails backend. 

## Demo