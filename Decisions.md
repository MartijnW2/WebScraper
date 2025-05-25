# Main decisions and thought processes behind them

---

## Framework & Language

**Decision**: React with TypeScript.

- TypeScript improves developer experience by enforcing type safety.
- **Trade-offs**: Slightly more boilerplate and complexity compared to JavaScript, but significant improvement in long-term maintainability.

---

## Scraping Approach: Axios & Cheerio

**Decision**: Use Axios for HTTP requests and Cheerio for HTML parsing.

-  Axios provides a clean, promise-based API for fetching raw HTML efficiently.
-  Cheerio offers a fast interface to traverse and extract data from the HTML without needing a full browser.
-  This combination maximizes performance and simplicity for server-side scraping.
-  **Trade-offs**: Unlike headless browsers, it can’t handle JavaScript-rendered content but is far faster and lighter for static HTML pages.

---    

## State Management

**Decision**: Avoided Redux, used React state and custom hooks instead.

- The app's state is local, simple, and scoped to individual components, no need for a global store.
- React’s built-in state and context cover all current use cases.
- **Trade-offs**: Redux can provide predictable state handling at scale, but introduces boilerplate and complexity that would be unnecessary overkill for   this project’s scope.

---

## Custom Hooks

**Decision**: Use `useHeadlines.ts` to encapsulate headline-related state and logic.

- Promotes separation of concerns and improves testability and reusability of data-fetching logic.

---

## Styling

**Decision**: SCSS Modules with component-scoped styles.

- Keeps styles colocated with components and avoids class name collisions.
- **Trade-offs**: Requires additional tooling support, but pays off in larger projects with many components.

---

## Stored data in log file

**Decision**: `usage.log` is used to store usage data, this is preferred over a database for example SQLite 

- No querying needed we just append, `fs.appendFile` is trivial, fast and does not require configuration.
- We only read data when exporting.
- Highly performant, we don't need indexing, transactions etc..

---

## Usage Export Feature

**Decision**: `ExportUsage` component to export filtering data to `.xlsx`, as in my experience, customers often request similar features.

- Treats this as a self-contained feature for better modularity and future extensibility.

---

## Testing Framework

**Decision**: Use Vitest instead of Jest while being familiar with both.

- Vitest is faster, supports native ES modules, integrates well with Vite, and has first-class TypeScript support.
- **Trade-offs**: While Vitest is newer than Jest, it provides comparable functionality with better performance for component-level tests.

---

## Test Files

**Decision**: Keep test files next to the components they test.

- Improves developer experience by keeping related logic together and reduces context switching.

**Decision**: Only created 2 test files.

- Created 2 test files to showcase my skills to test components but did not have time to cover all scripts.

---

## Server-Client Separation

**Decision**: Split logic between server and client instead of doing everything in the frontend.

- The server (Node.js with TypeScript) is responsible for scraping data to avoid exposing scraping logic or credentials to the browser.
- This separation ensures better **security**, **performance**, and **scalability**, especially as the scraping and data processing needs grow.

- **Trade-offs**: Requires maintaining two environments (server and client), but enables a more robust architecture aligned with production-grade standards.
