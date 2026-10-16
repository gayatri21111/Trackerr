# Task Tracker

A simple Task Tracker built with plain HTML, CSS and JavaScript (no build step, no backend).

## Features

**1.1 Create and Display Tasks**
- Text box and Add button
- Tasks appear in a list
- Empty (or whitespace-only) tasks are rejected with an error message

**1.2 Manage Tasks**
- Checkbox to mark each task Completed or Pending
- Delete button on every task
- Live counters: Total, Completed, Pending

**1.3 Filter and Save Tasks**
- Filter by All / Pending / Completed
- Tasks and statuses are saved in `localStorage` and survive a page refresh
- Responsive layout for desktop and mobile

## How to run

No installation needed.

1. Unzip the project folder.
2. Open `index.html` in any modern browser (double-click it).

Optional, using a local server:

```bash
cd task-tracker
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `style.css` | Styling and responsive layout |
| `script.js` | App logic, filtering, localStorage |

## Screenshots

Add your screenshots to a `screenshots/` folder (desktop and mobile views).

## Incomplete features

None. All requirements from 1.1, 1.2 and 1.3 are implemented.
