# Tabloid &#8211; A New Way to Blog

## Table of Contents
  - [About](#about)
  - [Local Installation](#local-installation)
  - [Usage](#usage)
     - [Posts](#posts)
     - [My Posts](#my posts)
     - [Categories](#categories)
     - [Tags](#tags)

## About

Tabloid is a multi-user bloggling application designed to flawlessly manage and organize topics of interest. Once a profile is created, users can browse a community library of blog posts, view posts that they have contributed, edit or delete their posts, create new posts, and comment on posts. Users can also add tags to a post via an auto-completing search bar. This project was completed by a team of developers at NewForce over the course of two weeks. I personally completed the Firebase authentication, deletion of posts,  editing of posts, addition of tags to a post, removal of tags from a post, and viewing comments on a post features. 

This app was built using React, RESTful web-APIs via [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.1), and styled with [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/).

## Local Installation

1.  Download and install [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
    - If Node.js and npm are already installed, use `node -v && npm -v` to check the version and verify that both versions are `v10.24.1` & `6.14.13` or greater.
    - If the version is older than the minimum requirement, update to the latest stable version of [node](https://docs.npmjs.com/try-the-latest-stable-version-of-node) & [npm](https://docs.npmjs.com/try-the-latest-stable-version-of-npm).
2. Use [https or SSH](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line) to clone the project folder to a local directory:
    ```Bash
    $ git clone ...
    ```
3. From the cloned project directory:
    ```Bash
    $ npm install
    ```
4. Install the JSON Server node package:
    ```Bash
    $ npm install -g json-server
    ```
5. Navigate ⬆ up from the cloned project one directory level, create a new directory and copy the default database.json file:
    ```Bash
    $ cd .. && mkdir ./database && cp ../tabloid-full-stack-team-fuschia/api-base/database.json ./database
    ```
6. Move to the database directory and launch JSON Server:
    ```Bash
    $ cd ./database && json-server --watch default-entries.json --port 8088
    ```
7.  From the project root directory, run the following:
    ```Bash
    $ npm start
    ```
8. Once the app loads in the browser, click the Register tab to sign up for a new account and login.

## Usage
Tabloid is comprised of three sections:
- Posts
- My Posts
- Categories
- Tags

### Posts
Posts presents the user with a scrollable list of recent posts from the community. Users can browse posts and click on the title to view additional details about a given post.

### My Posts
My Posts presents the user with a list of their posts. Users can click on the title to view additional details about a given post, edit a post, delete a post, or manage the tags associated with each post.

### Categories
The categories view allows an administrator to manage the categories used to define a post. Admins can create, edit, or delete categories. A category can only be deleted if it has no associations to a post in the database.

## Tags
The tags view allows an administrator to manage the tags used to define a post. Admins can create, edit, or delete tags. If a tag is deleted, all database relationships to posts will also be deleted.
