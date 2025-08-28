# Karabiner-Elements Configuration

This is my personal configuration for [Karabiner-Elements](https://github.com/pqrs-org/Karabiner-Elements), using [karabiner.ts](https://github.com/evan-liu/karabiner.ts) for a typesafe, programmable setup.

- [karabiner-config.ts](https://github.com/dr-baker/karabiner-config/blob/main/karabiner-config.ts): Main configuration file
- [utils.ts](https://github.com/dr-baker/karabiner-config/blob/main/utils.ts): Utility functions

## Quick Start

### Prerequisites
- [Karabiner-Elements](https://karabiner-elements.pqrs.org/) installed and running
- Node.js (for building the configuration)

### Installation & Usage

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd karabiner-config-1
   npm install
   ```

2. **Build the configuration:**
   ```bash
   npm run build
   ```
   This compiles the TypeScript and automatically updates Karabiner-Elements.

3. **For development (watch mode):**
   ```bash
   npm run dev
   ```
   This watches for changes and rebuilds automatically.

### Available Scripts
- `npm run build` - Build once and update Karabiner-Elements
- `npm run dev` - Watch mode for iterative development
- `npm run update` - Update karabiner.ts dependency

## My Setup

My intention is to iterate on the original configuration by consolidating the configuration out of utils and into the configuration file. Bindings occur at the top of the file and additional logic is abstracted away. 

### Main Features

#### 1. Leader Key (l + ;)
- Press `l` + `;` simultaneously to activate leader mode
- Available groups:
  - **a**: App launcher
  - **e**: Emoji picker
  - **g**: Gitmoji picker
  - **l**: Link opener
  - **r**: Raycast commands
  - **s**: System settings

#### 2. Hyper Key App-Switching
- Duplicates leader+a logic, but I use that function frequently and sometimes prefer this binding.

#### 3. Extra Layers
- **Vim navigation (f + ;)**
- **Symbols (s + ;)**
- **Number pad (d + ;)**
- **Snippets (z + x)**
- **System (`)**

### Extending & Customizing
- All mappings and layers are defined in a modular way, making it easy to add new apps, layers, or shortcuts.
- See the comments in `karabiner-config.ts` for more details on each section.

---

This setup is a living document and evolves as my workflow changes. Feel free to fork or adapt for your own needs!
