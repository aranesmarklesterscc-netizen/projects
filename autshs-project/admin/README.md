# AUTSHS Admin Panel

## Overview
This is the admin panel for managing the Antonio Uy Tan Senior High School website. It provides a comprehensive dashboard for administrators to manage pages, content, settings, and website maintenance.

## Features

### 1. **Authentication**
- Superuser login system with username and password
- Remember me functionality
- Session-based authentication
- Logout functionality with confirmation

### 2. **Dashboard**
- Overview of website statistics
- Recent activity log
- Quick access to key metrics

### 3. **Page Management**
- View all website pages
- Edit page content
- Create new pages
- Delete pages
- Track publication status

### 4. **Content Management**
- Edit website content
- Select pages to modify
- WYSIWYG content editor support

### 5. **Website Settings**
- Configure school name, email, and contact information
- Customize theme colors
- Manage school address and phone numbers
- One-click settings save

### 6. **User Management**
- View admin users
- Create new admin accounts
- Manage user roles and permissions
- Track user activity

### 7. **Maintenance Tools**
- Backup website data
- Clear cache
- Run system health checks
- Export data as CSV

## Login Credentials

### Demo Account
- **Username:** `admin`
- **Password:** `password123`

## Security Notes

**⚠️ Important:** The current implementation uses client-side authentication for demo purposes. In a production environment:

1. Implement server-side authentication using PHP, Node.js, or similar
2. Use secure password hashing (bcrypt, Argon2)
3. Implement CSRF protection
4. Use HTTPS for all connections
5. Add rate limiting for login attempts
6. Implement two-factor authentication
7. Add proper session management
8. Store sensitive data in secure server-side sessions

## File Structure

```
admin/
├── index.html           # Redirect to login
├── login.html           # Login page
├── dashboard.html       # Admin dashboard
├── style.css           # Styling for all pages
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## How to Use

1. Navigate to `/admin/` or `/admin/index.html`
2. You'll be redirected to the login page
3. Enter the demo credentials above
4. Click "Login"
5. You'll be taken to the admin dashboard
6. Use the sidebar navigation to access different features
7. Click "Logout" to exit

## Responsive Design

The admin panel is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

On mobile, the sidebar collapses into a hamburger menu.

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Database integration
- Server-side validation
- Advanced user permissions
- Scheduled backups
- Email notifications
- Analytics dashboard
- SEO management tools
- Media gallery management
- Blog/news section management

## Support

For issues or feature requests, please contact the development team.
