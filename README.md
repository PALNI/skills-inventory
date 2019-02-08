# WordPress Skills Inventory and Employee Directory

This repository contains customization files (JavaScript and CSS) used for setting up a WordPress site to serve as a employee directory and inventory of employee skills.  The site was designed for a Library consortia so that employees from multiple institutions could set up personalized profiles and indicate their skills in a searchable directory.

![UPME Custom Fields Configuration](/images/profile.png)
![UPME Custom Fields Configuration](/images/search.png)

## Requirements

 - Wordpress 5.0 and above
 - [amr users](https://wordpress.org/plugins/amr-users/) (free plugin) 
 - [Custom CSS and Javascript](https://wordpress.org/plugins/custom-css-and-javascript/) (free plugin, any plugin that enables loading of custom CSS/JavaScript will work) 
 - [Restrict Content](https://wordpress.org/plugins/restrict-content/) (free plugin) - can be used so that no user profiles are visible to the public/non-registered users
 - [amr users plus](https://wpusersplugin.com/downloads/amr-users-plus/) (plugin, not free - $40 at time of writing)
 - [User Profiles Made Easy (UPME)](https://codecanyon.net/item/user-profiles-made-easy-wordpress-plugin/4109874) (plugin, not free - $30 at time of writing)

## Recommended Plugins
 - [Google Analytics](https://wordpress.org/plugins/googleanalytics/) - for tracking usage
 - [Really Simple SSL](https://wordpress.org/plugins/really-simple-ssl/) - for forcing HTTPS, requires SSL certificate (free with [Let's Encrypt](https://letsencrypt.org/))
 - [Google Apps Login](https://wordpress.org/plugins/google-apps-login/) - To enable users to login with their Google accounts
 - [Import users from CSV with Meta](https://wordpress.org/plugins/import-users-from-csv-with-meta/) - to bulk import users, so user accounts exist without them having to register
 - [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/) - for sending email via SMTP so your site's email doesn't end up in junk 

## Setup Your Own Skills Inventory and Directory in 9 Easy Steps

1.  Set up WordPress and Install Required Plugins
2.  Use Shortcodes to set up UPME pages 
 
 - My Account (Front Page): `[restrict][upme][/restrict]`
 - Register `[upme_registration]`
If you will have accounts not using Google Apps Login:
 - Reset Password `[upme_reset_password]`
 
3.  Configure custom fields using the UPME plugin
![UPME Custom Fields Configuration](/images/upme.png)
Note: user meta tags are referenced extensively in the custom CSS and JavaScript of this repository; if you change meta tags when setting up custom fields you will need to adjust the meta tag references in the CSS and JavaScript accordingly
4.  Set up a User List using the AMR-Users Plugin to make your users searchable
![AMR List Configuration](/images/amr.png)
5.  Create page with AMR Users List shortcode, e.g., `[restrict][userlist list=1][/restrict]` (Your List ID may vary)
6.  Implement custom CSS and JavaScript from this repository using the Custom CSS and JavaScript plugin
7.  Set up Recommended Plugins, if desired
8.  Import users to build directory of users, if desired  
9.  Create user instructions, if desired

## Meta

Created by Lauren Magnuson and Anna Shields for PALNI.