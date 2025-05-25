# Main decisions and thought processes behind them

---

## Framework & Language

**Decision**: React with TypeScript.

- TypeScript improves developer experience by enforcing type safety.
- **Trade-offs**: Slightly more boilerplate and complexity compared to JavaScript, but significant improvement in long-term maintainability.

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
