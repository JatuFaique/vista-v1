# Summary
Gemini Notes is a simple application to maintain your tasks and create your day-to-day tasks on the browser. Additionally, this application lets users maintain tasks between multiple sessions so that users do not miss saved lists.

## Requirements

### Functional
- User should be able to perform CRUD procedures.
- User should be able to maintain tasks between multiple page refreshes.
- Drag and drop functionality to move tasks between multiple states.
- User should be able to easily use the application on mobile, assuming the majority of the users prefer mobile rather than desktop.

### Non-Functional
- User should be able to access the application using keyboards and arrow navigations.
- User should be able to access tasks with minimum latency.

### Out of Scope
- Security.
  - Since the approach used currently to maintain the tasks between multiple page refreshes resides in LocalStorage, which is a security risk for private data. Ideally, it should be maintained on the backend using refresh tokens and session IDs.
- Using External Database to maintain a live connection for the user.

## Tech Choices
- Next.js: React-based complete framework
- TypeScript
- Vercel
- Zustand: Compact and easy-to-use global state management library
- Lazy Loading: Support for Image content in the future.

## Success Criteria
- No high-risk security issues on personal data.
- Minimum latency of the CRUD operations.
- Easy integration with APIs from the backend in the future.

## Assumptions and Constraints
- API integration not implemented.
- For development, we are using an out-of-the-box component library for Buttons, Layout, Dialog, and Inputs.
- Using Local Storage to sync data between page refreshes.
- User directly lands on the Kanban Board Page.
- No authentication required to update and manipulate.

## Design Diagrams
- Data Flow diagram Diagram
<img width="655" alt="image" src="https://github.com/JatuFaique/vista-v1/assets/52850100/6980ec48-4665-433b-ba8e-bd1ca11ad2cf">



## Design and Development Choices
- Used Next.js for fast build and deployment for end users and Vercel's Component Library.
- Zustand provides out-of-the-box Local Storage Persistent feature with minimum configurations.
- Shadcn: Easy-to-use component that uses highly accessible component with support for extensible and customization components.

## Interface Journey
### Task Board:
- User can see all the tasks at a single place, which improves readability and avoids scrolling.
- User Can Move tasks from One Task Board to another.
- User can easily delete the task if wanted to remove at any time.

### Task Creation:
- User can create a task by clicking on Create a New task button.
- Task title, Description, and Category Are Mandatory Fields.
- Validation for Text Field and Description are maintained.

## Additional Enhancements for the future
- Adding Encryption and Decryption logic for local storage data.
- Alternate data storage ex. External Database for consuming over the network.
- Sharing a web link to a task for users to share between friends and family.
