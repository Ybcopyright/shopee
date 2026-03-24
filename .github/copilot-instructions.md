# Workspace AI Agent Instructions for Shoppe Project

## Overview

This file provides guidance for AI agents (like GitHub Copilot) working in the Shoppe workspace. It documents conventions, build/test commands, and project-specific notes to maximize agent productivity and code quality.

---

## Project Structure

- **index.html**: Main entry point for the web app (Vietnamese e-commerce landing page)
- **asset/css/**: Contains `base.css` (reset, base styles) and `main.css` (site-specific styles)
- **asset/js/main.js**: Main JavaScript for interactivity
- **asset/img/**: Images for banners, categories, features, etc.

## Conventions

- **HTML**: Semantic, accessible, and annotated in Vietnamese for clarity
- **CSS**: Organized into base and main; use BEM naming for classes
- **JS**: All scripts in `asset/js/main.js`; keep DOM manipulation modular
- **Images**: Grouped by feature/category for maintainability

## Build/Test/Run

- No build step required (static site)
- To run: Open `index.html` in a browser
- No automated tests present

## Agent Guidance

- **Preserve Vietnamese comments and accessibility attributes**
- When adding new features, follow the semantic HTML and BEM class patterns
- Link to images and assets using relative paths
- For new CSS/JS, extend `main.css`/`main.js` unless a new module is justified
- Document any new sections or features in comments (in Vietnamese)

## Potential Pitfalls

- Do not remove or overwrite Vietnamese comments—they are important for maintainability
- Ensure all new UI is responsive and accessible
- Avoid hardcoding asset paths; use relative paths as in current code

## Example Prompts

- "Add a new product card to the homepage"
- "Implement a modal popup for promotions"
- "Refactor the navigation bar for mobile responsiveness"

---

For more complex customizations, consider creating agent-specific instructions or skills for frontend, accessibility, or localization.
