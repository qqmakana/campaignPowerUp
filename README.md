# PowerUp & Win Landing Page

## 🎯 Quick Start

1. **View the app**: Open `http://localhost:3001/` in your browser
2. **Admin dashboard**: Visit `http://localhost:3001/admin.html` to view form submissions
3. **Deploy**: Run `./deploy.sh` to create deployment package

## ✏️ How to Edit

### Text Content
- **Main heading**: Edit line 101 in `src/App.tsx`
- **Description**: Edit line 107 in `src/App.tsx`
- **Form labels**: Edit lines 475-600 in `src/App.tsx`

### Styling
- **Colors**: Change color values in Tailwind classes (e.g., `bg-red-500`)
- **Layout**: Modify CSS classes in the JSX elements
- **Logo**: Edit `public/assets/PowerUp&Win Logo.html`

### Logo
- **File location**: `public/assets/PowerUp&Win Logo.html`
- **Edit**: Open the HTML file and modify the CSS styles
- **Colors**: Change `#ff4444` (red) and `#3b82f6` (blue) values

### Video
- **File location**: `public/assets/V8.html`
- **Replace**: Upload your own video file and update the path in `src/App.tsx`

## 🚀 Deployment

### Quick Deploy (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag the `deployment` folder to deploy
3. Add custom domain: `www.powerupandwin.co.za`
4. Done! Your site is live.

### Manual Deploy
1. Upload `deployment` folder contents to your web server
2. Configure DNS for `www.powerupandwin.co.za`
3. Enable SSL/HTTPS

## 📊 Data Management

- **Form submissions**: Stored in browser localStorage
- **View data**: Visit `/admin.html` on your live site
- **Export data**: Use the "Export Data" button in admin dashboard

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Create deployment package
./deploy.sh
```

## 📁 File Structure

```
kayleApp/
├── src/
│   ├── App.tsx          # Main application
│   └── main.tsx         # Entry point
├── public/
│   ├── assets/
│   │   ├── PowerUp&Win Logo.html    # Logo file
│   │   ├── V8.html                  # Video file
│   │   └── agreement-template.html  # Agreement document
│   └── admin.html       # Admin dashboard
├── deployment/          # Ready-to-upload files
├── deploy.sh           # Deployment script
└── DEPLOYMENT_GUIDE.md # Detailed deployment instructions
```

## 🎨 Customization

### Colors
- **Primary Red**: `#ff4444` (change in logo and buttons)
- **Blue Accent**: `#3b82f6` (power button)
- **Background**: `#000000` (black)

### Fonts
- **Main Font**: Arial (change in CSS)
- **Logo Font**: Arial Black (change in logo HTML)

## 📞 Support

- **Deployment issues**: Check `DEPLOYMENT_GUIDE.md`
- **Code changes**: Edit files in `src/` directory
- **Assets**: Replace files in `public/assets/`

---

**Your PowerUp & Win app is ready to go live!** 🎉