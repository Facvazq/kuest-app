# Admin Console

The Admin Console provides comprehensive management capabilities for the FormifyApp website.

## Features

### 🔐 Authentication
- Access code: `builtforthisdev101`
- Secure authentication system
- Session management

### 📊 Project Management
- **Create Projects**: Add new projects with detailed information
- **Edit Projects**: Update existing project details
- **Delete Projects**: Remove projects from the system
- **Project Status**: Track project status (Active, Completed, On Hold)
- **Client Information**: Store client details and budget information
- **Deadlines**: Set and track project deadlines

### ⚙️ Site Settings
- **Availability Status**: Control site availability
  - Available for Projects
  - Unavailable for Projects  
  - 🏝️ Vacation Mode
- **Custom Messages**: Set custom messages for vacation/unavailable states
- **Contact Form Toggle**: Enable/disable contact form visibility
- **Maintenance Mode**: Enable maintenance mode for site updates

### 📈 Dashboard Analytics
- **Project Statistics**: View total projects and active projects count
- **Status Overview**: Quick view of current availability status
- **Real-time Updates**: Settings sync with homepage immediately

## Usage

### Accessing Admin Console
1. Navigate to `/admin` or click the shield icon in the bottom-right corner
2. Enter access code: `builtforthisdev101`
3. Access full admin functionality

### Managing Projects
1. Click "Add Project" to create a new project
2. Fill in project details:
   - Title (required)
   - Description (required)
   - Status (Active/Completed/On Hold)
   - Client name
   - Budget
   - Deadline
3. Save to add to your project list
4. Use Edit/Delete buttons to manage existing projects

### Site Settings
1. Navigate to Site Settings section
2. Change availability status as needed
3. Add custom messages for vacation/unavailable states
4. Toggle contact form visibility
5. Click "Save Settings" to apply changes

## Data Storage

All admin data is stored in browser localStorage:
- `admin-projects`: Project data
- `admin-settings`: Site settings and configuration

## Integration

The admin console integrates seamlessly with the homepage:
- Availability status displays in the top status indicator
- Custom messages show when contact form is disabled
- Maintenance mode can be toggled for site updates
- All changes are reflected immediately on the homepage

## Security

- Access code protection prevents unauthorized access
- All sensitive operations require authentication
- Data is stored locally for privacy
- No external API calls for admin functionality

## Future Enhancements

Potential future features:
- User management system
- Analytics dashboard
- Email notifications
- Project templates
- Export/import functionality
- Multi-user support
