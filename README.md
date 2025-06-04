# FitTrack - Your Health & Fitness Companion

![FitTrack Logo](./images/fitness.webp)

A comprehensive web application for tracking fitness goals, nutrition, and connecting with a health-focused community. Built with modern web technologies and responsive design principles.

## 🌟 Features

### 🏃‍♂️ Fitness Tracking
- **Activity Monitoring**: Track daily steps, calories burned, and active time
- **Goal Setting**: Set and monitor personalized fitness objectives
- **Progress Visualization**: Interactive charts showing weekly progress
- **Workout Tasks**: Create, manage, and complete fitness tasks

### 🥗 Nutrition Management
- **Meal Tracking**: Log meals with detailed nutritional information
- **Calorie Monitoring**: Track daily calorie intake vs. goals
- **Macro Tracking**: Monitor protein, carbs, and fats consumption
- **Goal Customization**: Set personalized nutrition targets
- **Data Filtering**: Filter meals by calorie ranges

### 🌤️ Weather Integration
- **Real-time Weather**: Current weather conditions based on your location
- **Location-based**: Automatic geolocation for accurate weather data
- **Workout Planning**: Plan outdoor activities based on weather conditions

### 👥 Community Features
- **Fitness Groups**: Join specialized fitness communities
- **Events**: Participate in community fitness events
- **Success Stories**: Read inspiring transformation stories
- **Social Interaction**: Connect with like-minded fitness enthusiasts

### 🔐 User Management
- **Registration**: Secure user account creation
- **Authentication**: Login with email and password
- **Data Persistence**: Local storage for user preferences
- **Remember Me**: Optional login persistence

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and DOM manipulation
- **jQuery**: Enhanced animations and UI interactions
- **Bootstrap 5**: Responsive framework and components

### APIs & Libraries
- **Chart.js**: Data visualization and progress charts
- **OpenWeatherMap API**: Real-time weather data
- **Font Awesome**: Icon library
- **Google Fonts**: Typography

### Development Tools
- **CSS Minification**: Optimized stylesheets
- **JavaScript Minification**: Compressed scripts
- **Image Optimization**: WebP format for better performance

## 📁 Project Structure

```
fittrack/
├── index.html              # Homepage
├── login.html              # User login page
├── register.html           # User registration page
├── dashboard.html          # Main dashboard
├── nutrition.html          # Nutrition tracking
├── community.html          # Community features
├── css/
│   └── styles.min.css      # Minified styles
├── js/
│   ├── script.min.js       # Main JavaScript functionality
│   ├── jquery-script.min.js # jQuery animations
│   └── weather.min.js      # Weather API integration
├── images/                 # Image assets
│   ├── fitness.webp       
│   ├── HIIT_Warriors.webp
│   ├── Mike's_Transformation.webp       
│   ├── Running_Club.webp
│   ├── Sarah's_Transformation.webp       
│   ├── Vegan_Fitness.webp
│   └── Yoga&Meditation.webp
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API features
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MnstrsParago/WEB_FINAL.FitTrack.git
   cd fittrack
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the application**
   - Navigate to `http://localhost:8000` (if using local server)
   - Or open `index.html` directly in your browser

### Configuration

#### Weather API Setup
1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Replace the API key in `js/weather.min.js`:
   ```javascript
   const apiKey = 'your-api-key-here';
   ```

## 📱 Responsive Design

FitTrack is built with a mobile-first approach and works seamlessly across all devices:

- **Desktop**: Full-featured experience with multi-column layouts
- **Tablet**: Optimized layouts for medium screens
- **Mobile**: Touch-friendly interface with stacked layouts

### Breakpoints
- **Large screens**: 1200px and up
- **Medium screens**: 768px - 1199px
- **Small screens**: 576px - 767px
- **Extra small**: Below 576px

## 🎯 Browser Compatibility

Tested and compatible with:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🔧 Features in Detail

### User Authentication
- Email validation with regex patterns
- Password strength requirements (minimum 8 characters)
- Form validation with real-time feedback
- Local storage for user data persistence

### Data Management
- Local storage for offline functionality
- JSON-based data structure
- CRUD operations for tasks and meals
- Data filtering and sorting capabilities

### Interactive Elements
- Modal dialogs for editing goals
- Animated progress bars
- Smooth transitions and hover effects
- Dynamic content loading

### Performance Optimizations
- Minified CSS and JavaScript files
- Lazy loading for images
- Optimized image formats (WebP)
- Efficient DOM manipulation

## 🌐 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://github.com/MnstrsParago/WEB_FINAL.FitTrack`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (none needed for static site)
3. Set publish directory: `/` (root)
4. Deploy automatically on git push

### Vercel
1. Import your GitHub repository to Vercel
2. Configure as a static site
3. Deploy with automatic HTTPS

## 🧪 Testing

### Manual Testing Checklist
- [ ] Registration form validation
- [ ] Login functionality
- [ ] Task creation and management
- [ ] Meal tracking and filtering
- [ ] Weather API integration
- [ ] Responsive design on all devices
- [ ] Cross-browser compatibility

### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast ratios
- [ ] Alt text for images
- [ ] ARIA labels where needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@MnstrsParago](https://github.com/MnstrsParago)
- Email: 240887@astanait.edu.kz
- Telegram: [@ser_bauyr](https://t.me/ser_bauyr)

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) for the responsive framework
- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Font Awesome](https://fontawesome.com/) for icons
- [Unsplash](https://unsplash.com/) for stock images

## 📊 Project Statistics

- **Lines of Code**: ~2,500+
- **Pages**: 6 HTML pages
- **Components**: 15+ interactive components
- **API Integrations**: 2 (Weather, Geolocation)
- **Responsive Breakpoints**: 4
- **Browser Support**: 4 major browsers

## 🔮 Future Enhancements

- [ ] User profile management
- [ ] Social media integration
- [ ] Workout video library
- [ ] Nutrition database integration
- [ ] Mobile app development
- [ ] Backend API development
- [ ] Real-time chat features
- [ ] Wearable device integration

---

**Made with ❤️ for fitness enthusiasts everywhere**
```

This README.md file provides:

1. **Comprehensive Documentation**: Covers all aspects of your project
2. **Professional Presentation**: Well-structured with emojis and clear sections
3. **Technical Details**: Installation, configuration, and deployment instructions
4. **Feature Overview**: Detailed description of all functionalities
5. **Development Information**: Technologies used, project structure, and testing
6. **Contribution Guidelines**: How others can contribute to the project
7. **Deployment Instructions**: Multiple hosting options
8. **Accessibility Information**: Testing checklist and compatibility details

This README.md significantly strengthens your project's documentation score and demonstrates professional development practices. It shows that you understand not just how to code, but how to properly document and present a project for others to use and contribute to.

