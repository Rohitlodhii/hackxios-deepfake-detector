# Design Document: Deepfake Detector UI

## Overview

The Deepfake Detector UI is a modern, responsive web application built with Next.js 16 App Router that provides users with an intuitive interface to upload images and receive AI-powered predictions about whether the images are likely to be deepfakes. The application emphasizes simplicity, accessibility, and performance while maintaining a clean, professional aesthetic.

The system follows a client-server architecture where the frontend handles user interactions and file uploads, while communicating with a separate backend service for image analysis. The design prioritizes user experience through clear visual feedback, loading states, and error handling.

## Architecture

### Component Architecture

The application follows a modular component architecture with clear separation of concerns:

```
App Layout
├── Navigation Bar (Server Component)
├── Main Content Area (Client Component)
    ├── Image Upload Section
    │   ├── File Input Component
    │   ├── Upload Button
    │   └── File Validation
    ├── Loading State Component
    ├── Results Display Component
    └── Error Display Component
```

### Data Flow

1. **User Interaction**: User selects an image file through the file input
2. **Client Validation**: Frontend validates file type and size
3. **Form Submission**: User clicks submit, triggering API call
4. **Loading State**: UI shows loading indicator while request is in progress
5. **API Communication**: FormData with image sent to backend via fetch API
6. **Response Handling**: Backend response processed and displayed to user
7. **Error Handling**: Any errors caught and displayed with user-friendly messages

### State Management

The application uses React's built-in state management:
- `useState` for component-level state (file selection, loading, results, errors)
- No external state management library needed due to simple state requirements
- State is localized to the main upload component to maintain simplicity

## Components and Interfaces

### Navigation Bar Component

**Purpose**: Provides branding and external navigation links
**Type**: Server Component (static content)
**Props**: None required

```typescript
interface NavigationBarProps {
  className?: string;
}
```

**Features**:
- Responsive design using Tailwind CSS breakpoints
- GitHub button with external link (left side)
- Application title "Deepfake Detector" (right side)
- Uses shadcn/ui Button component for consistent styling

### Image Upload Component

**Purpose**: Handles file selection and upload initiation
**Type**: Client Component (requires interactivity)

```typescript
interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  isLoading: boolean;
  disabled?: boolean;
}

interface FileInputState {
  selectedFile: File | null;
  isDragOver: boolean;
  validationError: string | null;
}
```

**Features**:
- File type validation (jpg, jpeg, png only)
- Single file upload restriction
- Drag and drop support (optional enhancement)
- Visual feedback for file selection
- Submit button state management (disabled when no file selected)

### Results Display Component

**Purpose**: Shows prediction results in a clear, accessible format
**Type**: Client Component

```typescript
interface PredictionResult {
  fake_probability: number;
  real_probability: number;
  label: "Likely Fake" | "Likely Real";
  disclaimer: string;
}

interface ResultsDisplayProps {
  result: PredictionResult;
  onReset: () => void;
}
```

**Features**:
- Prominent display of prediction label
- Probability scores formatted as percentages
- Color-coded results (red for fake, green for real)
- Disclaimer text for transparency
- Reset button to start new prediction

### Loading State Component

**Purpose**: Provides visual feedback during API requests
**Type**: Client Component

```typescript
interface LoadingStateProps {
  message?: string;
}
```

**Features**:
- Animated spinner using shadcn/ui Spinner component
- Contextual loading message
- Prevents user interaction during loading

### Error Display Component

**Purpose**: Shows user-friendly error messages
**Type**: Client Component

```typescript
interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
  onDismiss: () => void;
}
```

**Features**:
- Clear error messaging
- Retry functionality for recoverable errors
- Dismiss option to clear error state
- Uses shadcn/ui Alert component for consistent styling

## Data Models

### File Upload Model

```typescript
interface UploadFile {
  file: File;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface FileValidation {
  isValid: boolean;
  errors: string[];
  maxSize: number; // 10MB
  allowedTypes: string[]; // ['image/jpeg', 'image/jpg', 'image/png']
}
```

### API Request/Response Models

```typescript
interface PredictionRequest {
  image: File; // Sent as multipart/form-data
}

interface PredictionResponse {
  fake_probability: number;
  real_probability: number;
  label: "Likely Fake" | "Likely Real";
  disclaimer: string;
}

interface APIError {
  message: string;
  code?: string;
  details?: string;
}
```

### Application State Model

```typescript
interface AppState {
  selectedFile: File | null;
  isLoading: boolean;
  result: PredictionResponse | null;
  error: string | null;
  uploadProgress?: number;
}
```

## API Integration

### Backend Communication

**Base URL**: Retrieved from `process.env.NEXT_PUBLIC_BACKEND_ID`
**Endpoint**: `POST /predict`
**Content Type**: `multipart/form-data`

```typescript
async function uploadImage(file: File): Promise<PredictionResponse> {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ID}/predict`, {
    method: 'POST',
    body: formData,
    // Note: Do not set Content-Type header - browser sets it automatically for FormData
  });
  
  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }
  
  return response.json();
}
```

### Error Handling Strategy

1. **Network Errors**: Connection issues, timeout
2. **Validation Errors**: Invalid file type, size limits
3. **Server Errors**: 4xx/5xx HTTP status codes
4. **Parsing Errors**: Invalid JSON response format

Each error type has specific user-friendly messages and recovery options.

## Styling and Design System

### Design Tokens

- **Primary Colors**: Based on shadcn/ui default theme
- **Typography**: System font stack with Tailwind CSS typography
- **Spacing**: Tailwind CSS spacing scale (4px base unit)
- **Breakpoints**: Mobile-first responsive design
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### Component Styling

- **Cards**: shadcn/ui Card component for content containers
- **Buttons**: shadcn/ui Button with variants (default, outline, ghost)
- **Inputs**: shadcn/ui Input with proper focus states
- **Alerts**: shadcn/ui Alert for error and success messages

### Responsive Layout

```css
/* Mobile-first approach */
.upload-container {
  @apply w-full max-w-md mx-auto p-4;
}

@media (min-width: 768px) {
  .upload-container {
    @apply max-w-lg p-6;
  }
}

@media (min-width: 1024px) {
  .upload-container {
    @apply max-w-xl p-8;
  }
}
```

Now I need to use the prework tool to analyze the acceptance criteria before writing the Correctness Properties section.

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Based on the prework analysis, the following properties have been identified for property-based testing:

### Property 1: File Format Validation
*For any* file with a MIME type, the upload component should accept the file if and only if the MIME type is 'image/jpeg', 'image/jpg', or 'image/png'
**Validates: Requirements 2.1**

### Property 2: Single File Upload Enforcement  
*For any* attempt to select multiple files, the upload component should only retain the most recently selected file
**Validates: Requirements 2.2**

### Property 3: Responsive Layout Adaptation
*For any* viewport width, the navigation bar should maintain proper layout and readability without horizontal scrolling or content overflow
**Validates: Requirements 1.3**

### Property 4: Error Message Display
*For any* API error response, the application should display a user-friendly error message that doesn't expose technical implementation details
**Validates: Requirements 3.5**

### Property 5: Prediction Label Display
*For any* valid API response containing a label field, the result display should show the exact label value ("Likely Fake" or "Likely Real")
**Validates: Requirements 4.1**

### Property 6: Probability Formatting
*For any* probability value between 0 and 1 in the API response, the display should format it as a percentage with appropriate decimal places
**Validates: Requirements 4.2, 4.3**

### Property 7: Probability Display Consistency
*For any* API response with fake_probability and real_probability, both values should be formatted consistently and their sum should equal 100% (within rounding tolerance)
**Validates: Requirements 4.5**

### Property 8: Responsive Design Consistency
*For any* screen size from mobile (320px) to desktop (1920px), all interactive elements should remain accessible and properly sized
**Validates: Requirements 5.5**

## Error Handling

### Error Categories and Responses

**File Validation Errors**:
- Invalid file type: "Please select a JPG, JPEG, or PNG image file"
- File too large: "File size must be less than 10MB"
- No file selected: "Please select an image file to analyze"

**Network Errors**:
- Connection timeout: "Connection timed out. Please check your internet connection and try again"
- Server unavailable: "Service temporarily unavailable. Please try again in a few moments"
- Request failed: "Upload failed. Please try again"

**API Response Errors**:
- Invalid response format: "Received invalid response from server. Please try again"
- Missing required fields: "Incomplete prediction results. Please try again"
- Server error (5xx): "Server error occurred. Please try again later"

**Client-Side Errors**:
- JavaScript errors: Graceful degradation with fallback messaging
- Environment variable missing: "Configuration error. Please contact support"

### Error Recovery Strategies

1. **Automatic Retry**: For transient network errors (with exponential backoff)
2. **User-Initiated Retry**: Retry button for recoverable errors
3. **Graceful Degradation**: Fallback UI when components fail to load
4. **Error Boundaries**: React error boundaries to catch and handle component errors
5. **Validation Feedback**: Real-time validation with clear correction guidance

### Error Logging and Monitoring

- Client-side errors logged to browser console (development)
- Network errors include response status and timing information
- User-friendly error IDs for support correlation
- No sensitive information exposed in error messages

## Testing Strategy

### Dual Testing Approach

The application will use both unit testing and property-based testing to ensure comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and error conditions
**Property Tests**: Verify universal properties across all inputs

Together, these provide comprehensive coverage where unit tests catch concrete bugs and property tests verify general correctness.

### Property-Based Testing Configuration

**Testing Library**: `@fast-check/jest` for TypeScript/React applications
**Test Iterations**: Minimum 100 iterations per property test
**Test Tagging**: Each property test must reference its design document property

Tag format: `**Feature: deepfake-detector-ui, Property {number}: {property_text}**`

### Unit Testing Focus Areas

**Component Rendering**:
- Navigation bar displays correct elements and text
- Upload component renders with proper initial state
- Results display shows all required information
- Error messages appear with appropriate styling

**User Interactions**:
- File selection updates component state correctly
- Submit button enables/disables based on file selection
- Form submission triggers API call with correct parameters
- Reset functionality clears state and returns to initial view

**Edge Cases**:
- Empty file selection handling
- Large file size rejection
- Invalid file type rejection
- Network timeout scenarios
- Malformed API responses

### Property Testing Focus Areas

**File Validation Logic**:
- File type acceptance across all possible MIME types
- File size validation with various file sizes
- Multiple file selection behavior

**UI Responsiveness**:
- Layout adaptation across viewport sizes
- Text readability at different screen densities
- Interactive element accessibility on touch devices

**Data Processing**:
- Probability value formatting across all possible ranges
- API response handling with various response structures
- Error message generation for different error types

### Integration Testing

**API Integration**:
- Mock backend responses for consistent testing
- Test multipart/form-data request formatting
- Verify environment variable usage
- Test error response handling

**End-to-End Workflows**:
- Complete upload and prediction flow
- Error recovery scenarios
- Responsive behavior testing
- Accessibility compliance verification

### Testing Environment Setup

```typescript
// Jest configuration for property-based testing
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Performance Testing Considerations

While not part of automated testing, the following performance aspects should be manually verified:

- Image upload progress for large files
- UI responsiveness during API calls
- Memory usage with multiple file selections
- Bundle size optimization for fast loading

Each correctness property will be implemented as a single property-based test, ensuring that the universal behaviors hold across all valid inputs while unit tests verify specific examples and edge cases.