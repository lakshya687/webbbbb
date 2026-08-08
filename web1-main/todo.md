# Marketing Toolkit - Project TODO

## Phase 1: Design System & Data Models
- [ ] Set up Inter font via Google Fonts
- [ ] Configure Tailwind 4 color palette (blue #3B82F6, purple #8B5CF6)
- [ ] Create design tokens in index.css (spacing, shadows, gradients)
- [ ] Define tools data structure and categories
- [ ] Create database schema for tools and generation history

## Phase 2: Layout & Navigation
- [ ] Implement sticky top navigation bar
- [ ] Create responsive grid layout system
- [ ] Build DashboardLayout or custom layout wrapper
- [ ] Set up routing structure (Home, Catalog, ToolDetail)

## Phase 3: Homepage
- [ ] Design hero section with gradient background
- [ ] Implement category grid showcase (8 categories)
- [ ] Add featured tools carousel/section
- [ ] Create call-to-action buttons

## Phase 4: Tool Catalog Page
- [ ] Build search bar with real-time filtering
- [ ] Implement category filter buttons
- [ ] Create tool card component with icons and badges
- [ ] Add "New" and "Featured" badge display
- [ ] Implement pagination or infinite scroll

## Phase 5: Tool Detail Page
- [ ] Implement link-input toggle (paste link / quick-pick presets)
- [ ] Build per-category input forms
- [ ] Create output display area
- [ ] Add copy-to-clipboard functionality

## Phase 6: LLM Integration
- [ ] Set up LLM backend procedure in tRPC
- [ ] Implement streaming response handling
- [ ] Add loading states and error handling
- [ ] Create prompt templates for each tool category

## Phase 7: TiltCard & Visual Effects
- [ ] Build TiltCard component with 3D tilt effect
- [ ] Implement blueprint grid background
- [ ] Add gradient dividers between sections
- [ ] Create floating card animations

## Phase 8: Micro-interactions & Polish
- [ ] Add hover lift effects (translateY -2px)
- [ ] Implement button scale-on-click (0.97)
- [ ] Add staggered entrance animations (30-80ms)
- [ ] Implement smooth transitions (100-300ms)
- [ ] Ensure mobile-first responsive design
- [ ] Test prefers-reduced-motion compliance

## Phase 9: Testing & Delivery
- [ ] Write vitest tests for key components
- [ ] Test all tool categories and LLM generation
- [ ] Verify responsive design across breakpoints
- [ ] Performance optimization
- [ ] Save checkpoint and deliver to user
