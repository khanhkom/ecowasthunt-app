# UI Design Guide - Ứng Dụng AI Phân Loại Rác

## 📋 Tổng Quan

Ứng dụng sử dụng design system hiện đại với focus vào **sustainability**, **user engagement** và **mobile-first experience**. Thiết kế theo nguyên tắc **Material Design 3** kết hợp **iOS Human Interface Guidelines**.

---

## 🎨 Color Palette

### Primary Colors

```css
--purple-500: #8b5cf6 /* Primary brand color */ --purple-600: #7c3aed
  /* Hover states */ --purple-400: #a78bfa /* Light variant */;
```

### Secondary Colors

```css
--green-500: #10b981 /* Success, recycling */ --blue-500: #3b82f6
  /* Information, water */ --amber-500: #f59e0b /* Warning, achievements */
  --red-500: #ef4444 /* Error, urgent reports */;
```

### Neutral Colors

```css
--gray-50: #f9fafb /* Background */ --gray-100: #f3f4f6 /* Card background */
  --gray-200: #e5e7eb /* Borders */ --gray-500: #6b7280 /* Secondary text */
  --gray-800: #1f2937 /* Primary text */ --gray-900: #111827 /* Headings */
  --white: #ffffff /* Cards, buttons */;
```

### Environmental Theme Colors

```css
--eco-green: #16a34a /* Nature, organic waste */ --ocean-blue: #0ea5e9
  /* Water, clean environment */ --earth-brown: #92400e
  /* Organic, composting */ --sky-blue: #0284c7 /* Air quality, clean */;
```

---

## 🔤 Typography

### Font Family

```css
font-family:
  'San Francisco',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  sans-serif;
```

### Font Scales

```css
/* Headers */
--text-4xl: 36px; /* Main titles */
--text-3xl: 30px; /* Section titles */
--text-2xl: 24px; /* Card titles */
--text-xl: 20px; /* Subtitle */
--text-lg: 18px; /* Large body */

/* Body Text */
--text-base: 16px; /* Default body */
--text-sm: 14px; /* Secondary text */
--text-xs: 12px; /* Captions, labels */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 🖼️ Layout & Spacing

### Container Spacing

```css
--container-padding: 20px; /* Main horizontal padding */
--section-gap: 24px; /* Between major sections */
--card-gap: 16px; /* Between cards */
--element-gap: 12px; /* Between small elements */
```

### Component Spacing

```css
--space-1: 4px; /* Tight spacing */
--space-2: 8px; /* Small spacing */
--space-3: 12px; /* Medium spacing */
--space-4: 16px; /* Large spacing */
--space-5: 20px; /* Extra large */
--space-6: 24px; /* Section spacing */
```

### Border Radius

```css
--radius-sm: 8px; /* Small elements */
--radius-md: 12px; /* Cards, buttons */
--radius-lg: 16px; /* Large cards */
--radius-xl: 20px; /* Modals */
--radius-full: 9999px; /* Pills, badges */
```

---

## 🎯 Component Patterns

### Cards

```typescript
// Standard card styling
{
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3, // Android
}
```

### Buttons

#### Primary Button

```typescript
{
  backgroundColor: '#8B5CF6',
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 16,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}
```

#### Secondary Button

```typescript
{
  backgroundColor: '#FFFFFF',
  borderWidth: 1,
  borderColor: '#8B5CF6',
  borderRadius: 12,
  paddingVertical: 12,
  paddingHorizontal: 16,
}
```

#### Icon Button

```typescript
{
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: '#F3F4F6',
  justifyContent: 'center',
  alignItems: 'center',
}
```

### Input Fields

```typescript
{
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  fontSize: 16,
}
```

---

## 🌟 Interactive Elements

### Hover/Press States

```typescript
// TouchableOpacity default
activeOpacity: 0.8;

// Scale animation for important buttons
scale: Animated.Value(1); // animate to 0.95 on press
```

### Loading States

```typescript
// Skeleton loading
backgroundColor: '#F3F4F6';
// with shimmer animation
```

### Success/Error States

```typescript
// Success
borderColor: '#10B981';
backgroundColor: '#ECFDF5';

// Error
borderColor: '#EF4444';
backgroundColor: '#FEF2F2';
```

---

## 🎨 Visual Hierarchy

### Information Architecture

1. **Header** - Navigation + Title (24px bold)
2. **Stats/Summary** - Key metrics in cards
3. **Quick Actions** - Primary feature access
4. **Content Feed** - Main content area
5. **Secondary Actions** - Settings, help

### Visual Weight

- **Primary actions**: Purple gradient, large size
- **Secondary actions**: White background, purple border
- **Tertiary actions**: Gray background, smaller
- **Destructive actions**: Red color scheme

---

## 🔧 Platform-Specific Adaptations

### iOS

```typescript
paddingTop: Platform.OS === 'ios' ? 60 : 40, // Safe area
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.1,
shadowRadius: 8,
```

### Android

```typescript
elevation: 3, // Material shadows
paddingTop: StatusBar.currentHeight + 20,
```

---

## 🎭 Animation Guidelines

### Timing Functions

```typescript
// Spring animations
{
  tension: 50,
  friction: 8,
  useNativeDriver: true
}

// Ease animations
duration: 300,
easing: Easing.bezier(0.25, 0.1, 0.25, 1)
```

### Common Animations

- **Modal slide up**: `translateY` from screen height to 0
- **Card appear**: `scale` from 0.9 to 1 + `opacity`
- **Button press**: `scale` to 0.95
- **Loading**: Continuous rotation or shimmer

---

## 🌍 Environmental Theme Integration

### Waste Type Color Coding

```typescript
const wasteTypeColors = {
  plastic: '#3B82F6', // Blue - water/ocean
  paper: '#10B981', // Green - forest/trees
  metal: '#F59E0B', // Amber - industrial
  glass: '#8B5CF6', // Purple - premium
  organic: '#84CC16', // Lime - nature
  general: '#6B7280', // Gray - neutral
};
```

### Status Indicators

```typescript
const statusColors = {
  success: '#10B981', // Green
  warning: '#F59E0B', // Amber
  error: '#EF4444', // Red
  info: '#3B82F6', // Blue
  pending: '#6B7280', // Gray
};
```

---

## 📱 Screen-Specific Patterns

### Tab Navigator

```typescript
{
  tabBarActiveTintColor: '#8B5CF6',
  tabBarInactiveTintColor: '#6B7280',
  tabBarStyle: {
    backgroundColor: '#F9FAFB',
    borderTopWidth: 0.5,
    borderTopColor: '#E5E7EB',
    height: Platform.OS === 'ios' ? 85 : 65,
    paddingBottom: Platform.OS === 'ios' ? 25 : 8,
    elevation: 8,
  }
}
```

### Header Pattern

```typescript
{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingTop: Platform.OS === 'ios' ? 60 : 40,
  paddingBottom: 20,
  backgroundColor: '#FFFFFF',
}
```

---

## 🏆 Gamification Elements

### Achievement Badges

```typescript
// Badge container
{
  borderWidth: 2,
  borderColor: '#10B981', // or gray for inactive
  borderRadius: 12,
  padding: 16,
  alignItems: 'center',
  backgroundColor: earned ? '#FFFFFF' : '#F9FAFB',
}
```

### Progress Bars

```typescript
// Container
{
  height: 8,
  backgroundColor: '#F3F4F6',
  borderRadius: 4,
  overflow: 'hidden',
}

// Fill
{
  height: '100%',
  backgroundColor: '#8B5CF6',
  borderRadius: 4,
}
```

### Point Displays

```typescript
// Always show with star icon
<StarSolidIcon size={14} color="#8B5CF6" />
<Text style={{ color: '#8B5CF6', fontWeight: '600' }}>
  {points.toLocaleString()} điểm
</Text>
```

---

## 🎨 Icon System

### Icon Library

**Primary**: `react-native-heroicons` (outline & solid variants)

### Icon Usage Rules

- **Outline icons**: Default state, navigation
- **Solid icons**: Active state, selected items
- **Size scale**: 16px (small), 20px (medium), 24px (large), 32px (XL)
- **Color**: Inherit from parent or use semantic colors

### Common Icons

```typescript
// Navigation
HomeIcon, MapIcon, UserIcon, UserGroupIcon, CogIcon

// Actions
PlusIcon, CameraIcon, ShareIcon, BookmarkIcon, HeartIcon

// Status
CheckCircleIcon, ExclamationTriangleIcon, ClockIcon

// Waste Types
RecyclingIcon, TrashIcon (general purpose)
```

---

## 🔄 State Management Visual Patterns

### Loading States

```typescript
// Skeleton cards
{
  backgroundColor: '#F3F4F6',
  height: 20,
  borderRadius: 4,
  marginBottom: 8,
}
```

### Empty States

```typescript
// Center aligned with icon
{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 40,
}
```

### Error States

```typescript
// Red accent with retry button
{
  backgroundColor: '#FEF2F2',
  borderColor: '#EF4444',
  borderWidth: 1,
  borderRadius: 12,
  padding: 16,
}
```

---

## 📐 Responsive Guidelines

### Breakpoints

- **Small phones**: < 350px width
- **Standard phones**: 350-414px width
- **Large phones**: > 414px width
- **Tablets**: > 768px width

### Adaptive Elements

```typescript
// Card width calculation
width: (screenWidth - padding * 2 - gap) / 2;

// Responsive font sizes
fontSize: screenWidth < 350 ? 14 : 16;

// Grid layouts
numColumns: screenWidth > 768 ? 3 : 2;
```

---

## ✅ Accessibility Guidelines

### Color Contrast

- **Text on white**: Minimum contrast ratio 4.5:1
- **Text on colored backgrounds**: Test with WCAG AA standards
- **Never rely on color alone** for important information

### Touch Targets

```typescript
// Minimum touch target
minHeight: 44,
minWidth: 44,

// Recommended for primary actions
minHeight: 48,
minWidth: 48,
```

### Screen Reader Support

```typescript
// Always include
accessibilityLabel: 'Descriptive text';
accessibilityHint: 'What happens when activated';
accessibilityRole: 'button' | 'text' | 'image';
```

---

## 🚀 Performance Considerations

### Image Optimization

```typescript
// Use appropriate sizes
resizeMode: 'cover',
style: { width: 300, height: 200 }

// Lazy loading ready
defaultSource: require('./placeholder.png')
```

### Animation Performance

```typescript
// Always use native driver when possible
useNativeDriver: true;

// Avoid animating layout properties
// Prefer: opacity, scale, translateX/Y
```

### List Performance

```typescript
// For long lists
getItemLayout={(data, index) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
})}
removeClippedSubviews={true}
```

---

## 📝 Code Style Guidelines

### Naming Conventions

```typescript
// Styles
const styles = StyleSheet.create({
  container: {}, // Main wrapper
  card: {}, // Card components
  button: {}, // Buttons
  text: {}, // Text styles
  icon: {}, // Icon containers
});

// Components
ComponentName; // PascalCase
variableName; // camelCase
CONSTANT_VALUE; // UPPER_CASE
```

### Style Organization

```typescript
// Order: Layout -> Visual -> Text -> Platform
{
  // Layout
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  // Dimensions
  width: 100,
  height: 50,
  margin: 10,
  padding: 15,

  // Visual
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  borderWidth: 1,
  borderColor: '#E5E7EB',

  // Shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,

  // Text
  fontSize: 16,
  fontWeight: '600',
  color: '#1F2937',

  // Platform specific
  ...Platform.select({
    ios: { paddingTop: 60 },
    android: { paddingTop: 40 },
  })
}
```

---

_Design system được tối ưu cho trải nghiệm di động, accessibility, và performance. Luôn ưu tiên user experience và tính nhất quán trong toàn bộ ứng dụng._
