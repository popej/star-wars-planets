# Star Wars Planets Browser

A modern, server-side rendered web application built with **Nuxt 3**, **Vue 3**, and **TypeScript** that allows users to explore planets from the Star Wars universe using the [SWAPI (Star Wars API)](https://swapi.dev/).

## 🌟 Features

### Home Page
- **Planet List**: Display of planets with name, population, and calculated distance from sun
- **Search Functionality**: Filter planets by name and minimum population with real-time validation using vee-validate
- **Sorting**: Sort planets by population or distance from sun (ascending/descending)
- **Infinite Scroll**: Seamless loading of additional planets as you scroll
- **Skeleton Loading**: Elegant loading states during data fetching
- **Server-Side Rendering (SSR)**: Fast initial page load and SEO optimization

### Planet Detail Page
- **Comprehensive Information**: Detailed view of individual planets
- **Basic Data**: Diameter, population, and distance from sun
- **Characteristics**: Climate, gravity, and terrain information
- **Navigation**: Easy back button to return to the home page
- **SSR Support**: Server-side rendered for optimal performance

## 🔬 Technical Highlights

### Distance Calculation
The application calculates the relative distance of planets from their star using **Kepler's Third Law**:

```
distance ∝ orbital_period^(2/3)
```

Where the orbital period (in days) is provided by SWAPI. This gives accurate relative distances between planets.

### Technology Stack
- **Framework**: Nuxt 3
- **Frontend**: Vue 3 with Composition API
- **Language**: TypeScript (strict mode)
- **Validation**: vee-validate
- **Styling**: SCSS with custom variables and responsive design
- **Testing**: Vitest + @vue/test-utils
- **API**: SWAPI (swapi.dev)

## 📦 Installation

### Prerequisites
- Node.js 22.x or higher
- bun or npm package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/popej/star-wars-planets.git
   cd star-wars-planets
   ```

2. **Install dependencies**
   ```bash
   bun/npm install
   ```

3. **Run the development server**
   ```bash
   bun/npm run dev
   ```

   The application will be available at `http://localhost:3000`

4. **Build for production**
   ```bash
   bun/npm run build
   ```

5. **Preview production build**
   ```bash
   bun/npm run preview
   ```

## 🧪 Testing

### Run Tests
```bash
bun/npm test
```

### Run Tests with UI
```bash
bun/npm run test:ui
```

## 📁 Project Structure

```
star-wars-planets/
├── assets/
│   └── styles/
│       ├── main.scss           # Global styles
│       └── variables.scss      # SCSS variables (colors, spacing, etc.)
├── components/
│   ├── PlanetCard.vue          # Planet card component
│   ├── SearchForm.vue          # Search form with vee-validate
│   ├── SkeletonLoader.vue      # Loading skeleton component
│   └── SortControls.vue        # Sorting controls component
├── composables/
│   └── useSwapi.ts             # SWAPI API integration
├── pages/
│   ├── index.vue               # Home page with planet list
│   └── planet/
│       └── [id].vue            # Planet detail page
├── tests/
│   ├── planetUtils.test.ts     # Utility function tests
│   └── PlanetCard.test.ts      # Component tests
├── types/
│   └── planet.ts               # TypeScript interfaces
├── utils/
│   └── planetUtils.ts          # Utility functions
├── nuxt.config.ts              # Nuxt configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── vitest.config.ts            # Vitest configuration
```

## 🎨 Key Components

### PlanetCard
Displays a summary of a planet with hover effects and navigation to detail page.

### SearchForm
- Text input for planet name search
- Number input for minimum population filter
- Form validation with vee-validate
- Reset functionality

### SkeletonLoader
Animated loading placeholders that maintain layout structure during data fetching.

### SortControls
Toggle buttons for sorting planets by population or distance with ascending/descending order.

## 🔧 Configuration

### Environment Variables
No environment variables are required. The application uses the public SWAPI endpoint.

### SCSS Variables
Customize the application's appearance by modifying variables in `assets/styles/variables.scss`:
- Colors (background, text, accent)
- Spacing
- Border radius
- Typography
- Breakpoints

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1280px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🚀 Performance Optimized


## 🧮 Data Processing

### Distance Calculation
Using Kepler's Third Law (`T² ∝ a³`), we calculate:
```typescript
distance = orbital_period^(2/3)
```

This provides relative distances that can be compared between planets.

### Number Parsing
The application handles SWAPI's string-based numbers:
- Converts comma-separated numbers (e.g., "1,000,000")
- Handles "unknown" values gracefully
- Displays formatted numbers in the UI

## 🐛 Known Limitations

- Population filtering is client-side (SWAPI doesn't support population queries)
- "Unknown" values are treated as zero for sorting purposes
- Rate limit: 10,000 requests per day per IP (SWAPI limitation)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [SWAPI](https://swapi.dev/) for providing the Star Wars data API
- [Nuxt 3](https://nuxt.com/) for the amazing framework
- [Vue 3](https://vuejs.org/) for the reactive frontend framework
- [vee-validate](https://vee-validate.logaretm.com/) for form validation

## 📞 Support

For issues and questions, please open an issue on the GitHub repository.

---

**May the Force be with you!** ⭐
