TGSRTC Bus Booking UI - React
A React-based frontend clone for the TGSRTC (Telangana State Road Transport Corporation) booking system. This is a clean, modular SPA designed to handle the end-to-end user flow from route searching to passenger detail collection.

Features
SPA Architecture: Fast, client-side routing for a seamless booking experience without page reloads.

Smart Search: Filter buses by Source/Destination or directly via Service Number.

Dynamic Booking Engine: Support for multiple ticket bookings in a single session.

State-Driven Forms: All inputs use controlled components with real-time validation logic.

Modular Component Library: High reusability with decoupled components for seats, bus cards, and passenger inputs.

 Tech Stack
Core: React 18+

State Management: React Hooks (useState, useEffect, useContext)

Styling: CSS Modules / Tailwind (Standard CSS for UI consistency)

Icons: React Icons / Lucide

Form Logic & Validation
The passenger detail collection uses a dynamic array in state. Each form field is validated against:

Regex checks for names and contact info.

Conditional rendering for age-specific seat requirements.

Error state tracking to prevent submission on invalid inputs.
