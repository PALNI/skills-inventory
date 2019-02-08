# WordPress Skills Inventory and Employee Directory

This repository contains customization files (JavaScript and CSS) used for setting up a WordPress site to serve as a employee directory and inventory of employee skills.  The site was designed for a Library consortia so that employees from multiple institutions could set up personalized profiles and indicate their skills in a searchable directory.

## Requirements

 - Wordpress 5.0 and above
 - [amr users](https://wordpress.org/plugins/amr-users/) (free plugin) 
 - [Custom CSS and Javascript](https://wordpress.org/plugins/custom-css-and-javascript/) (free plugin, any plugin that enables loading of custom CSS/JavaScript will work) 
 - [Restrict Content](https://wordpress.org/plugins/restrict-content/) (free plugin)
 - [amr users plus](https://wpusersplugin.com/downloads/amr-users-plus/) (plugin, not free - $40 at time of writing)
 - [User Profiles Made Easy (UPME)](https://codecanyon.net/item/user-profiles-made-easy-wordpress-plugin/4109874) (plugin, not free - $30 at time of writing)

## Recommended Plugins
 - [Google Analytics](https://wordpress.org/plugins/googleanalytics/) - for tracking usage
 - Really Simple SSL - for forcing HTTPS
 - Google Apps Login - To enable users to login with their Google accounts
 - Import users from CSV with Meta - to bulk import users, so your users accounts exist without them having to register
 - WP Mail SMTP

## Setup Your Own Skills Inventory in 7 Easy Steps

1.  Use Shortcodes to set up UPME pages 
 
 - My Account (Front Page): `[restrict][upme][/restrict]`
 - Register `[upme_registration]`
If you will have accounts not using Google Apps Login:
 - Reset Password `[upme_reset_password]`
 
2.  Configure custom fields using the UPME plugin
![UPME Custom Fields Configuration](/images/upme.png)
Note: if you change any meta tags when creating your own fields, you must look for the tags in the custom CSS / JavaScript in this repository and update the code accordingly
3.  Set up a User List using the AMR-Users Plugin to make your users searchable
![AMR List Configuration](/images/amr.png)
4.  Create page with AMR Users List shortcode, e.g., `[restrict][userlist list=1][/restrict]` (Your List ID may vary)
5.  Implement custom CSS and JavaScript from this repository using the Custom CSS and JavaScript plugin
6.  Set up Recommended Plugins, if desired
7.  Import users to build directory of users, if desired  

## Meta

Created by Lauren Magnuson and Anna Shields for PALNI.