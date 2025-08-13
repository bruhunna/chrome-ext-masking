# Element Masker Chrome Extension

A Chrome extension that allows users to manually mask any element on a webpage by simply clicking on it. Perfect for privacy protection during screen sharing, creating sanitized screenshots, or hiding sensitive information while browsing.

## 🛡️ Features

### Manual Element Selection
- **Ctrl/⌘ + Click to Mask**: Hold Ctrl (Windows/Linux) or ⌘ (Mac) and click any element to mask it
- **Normal Interaction Preserved**: Regular clicks work normally - buttons, links, and forms remain functional
- **Visual Feedback**: Blue outline appears when holding Ctrl/⌘ and hovering over maskable elements
- **Toggle Masking**: Hold Ctrl/⌘ and click masked elements again to unmask them
- **Smooth Animations**: Professional transitions and visual effects

### Keyboard Shortcuts
- **Ctrl+Shift+M** (Cmd+Shift+M on Mac): Quick toggle masking mode on/off
- **Ctrl+Shift+C** (Cmd+Shift+C on Mac): Clear all masks instantly
- **Works from any page**: No need to open the popup interface

### Multiple Mask Styles
- **Blur Style**: Maintains element shape with blur filter (subtle masking)
- **Solid Style**: Completely covers content with dark background (strong masking)
- **Style Toggle**: Switch between styles via popup interface or keyboard shortcut
- **Real-time Updates**: Existing masks instantly update when style is changed

### Privacy & Control
- **Precise Control**: You decide exactly what gets masked
- **Instant Results**: Elements are masked immediately with dark overlay and blur effect
- **Content Preservation**: Original content is safely stored and can be restored
- **Session Persistence**: Masking state persists across page reloads

### User-Friendly Interface

- Modern toggle switch design with gradient effects
- Visual badge counter showing masked element count on extension icon
- Style selector with blur/solid preview options
- Real-time statistics display in popup
- Clear visual indicators (green = active, gray = inactive)
- Success/error message feedback with toast notifications
- Works on all websites (except Chrome internal pages)

## 📥 Installation

### Method 1: Load Unpacked Extension (Development)

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The Element Masker icon will appear in your toolbar

### Method 2: Chrome Web Store (Coming Soon)
*This extension will be available on the Chrome Web Store once published.*

## 🚀 Quick Start

### Method 1: Using the Popup Interface

1. **Install the extension** using one of the methods above
2. **Navigate to any website** you want to mask content on
3. **Click the Element Masker icon** in your browser toolbar
4. **Toggle "Masking Mode" switch** (switch turns purple/blue and shows "Active")
5. **Hold Ctrl/⌘ + hover over elements** to see them highlighted with blue outline
6. **Hold Ctrl/⌘ + click elements** to mask them (they turn dark or blurred)
7. **Use style buttons** to switch between blur and solid masking styles
8. **Monitor the badge counter** on the extension icon showing number of masked elements
9. **Toggle "Masking Mode" switch off** when finished

### Method 2: Using Keyboard Shortcuts (Fastest)

1. **Install the extension** and navigate to any website
2. **Press Ctrl+Shift+M** (Cmd+Shift+M on Mac) to instantly toggle masking mode
3. **Hold Ctrl/⌘ + click elements** to mask them
4. **Press Ctrl+Shift+C** (Cmd+Shift+C on Mac) to clear all masks instantly
5. **Press Ctrl+Shift+M** again to deactivate masking mode

## 💻 Usage

### Basic Workflow

#### Activating Masking Mode
1. Click the Element Masker extension icon
2. Click "Activate Masking Mode"
3. The button turns red and shows "Deactivate Masking Mode"
4. You'll see a success message: "Masking mode activated! Click elements to mask them."

#### Masking Elements
1. Hold Ctrl (Windows/Linux) or ⌘ (Mac) and hover over any element on the page
2. A blue outline will appear around the element while holding the modifier key
3. Hold Ctrl/⌘ and click the element to mask it
4. Regular clicks (without Ctrl/⌘) work normally for buttons, links, and forms
5. The masked element will:
   - Turn dark gray/black
   - Show ██████ text instead of original content
   - Apply a blur effect
   - Show a "not-allowed" cursor

#### Unmasking Elements
1. Hold Ctrl/⌘ and click on any masked element
2. It will instantly return to its original appearance
3. All original content and styling is restored

#### Deactivating Masking Mode
1. Click the extension icon
2. Click "Deactivate Masking Mode"
3. All masked elements are automatically unmasked
4. Button returns to blue "Activate Masking Mode"

### Advanced Features

#### Session Persistence
- **Page Reload**: Masking mode stays active when you refresh the page
- **Masked Elements**: Individual masked elements remain masked after page reload
- **State Memory**: The extension remembers your masking preferences

#### Visual Indicators
- **Blue Outline**: Appears when holding Ctrl/⌘ and hovering over maskable elements
- **Real-time Guidance**: Instructions appear when modifier key is pressed
- **Dark Overlay**: Masked elements have dark background
- **Blur Effect**: Additional privacy protection with CSS blur
- **Placeholder Text**: Shows ██████ to indicate masked content

## 🔧 Technical Details

### Project Structure
```
chrome-ext-masking/
├── manifest.json          # Extension configuration (Manifest V3)
├── popup.html             # Extension popup interface
├── popup.js               # Popup logic and Chrome API communication
├── content.js             # Core masking functionality
├── background.js          # Background service worker
├── test-page.html         # Test page for development
└── icons/                 # Extension icons
    └── reshot-icon-hacker-mask-HULA7G4RN3.svg
```

### Key Components

#### Content Script (`content.js`)
- **Element Detection**: Tracks hover and click events
- **Visual Effects**: Applies masking styles with CSS
- **State Management**: Manages masked elements set
- **Session Storage**: Persists masking state across page loads

#### Popup Interface (`popup.html` + `popup.js`)
- **Toggle Control**: Single button to activate/deactivate masking
- **State Synchronization**: Communicates with content script
- **User Feedback**: Shows success/error messages
- **Visual Indicators**: Button color changes based on state

#### Background Worker (`background.js`)
- **Extension Lifecycle**: Handles installation and setup
- **Default Settings**: Configures initial extension state
- **Welcome Experience**: Opens welcome page on first install

### Masking Implementation

#### Element Masking Process
1. **Click Detection**: Event listener captures clicks in masking mode
2. **Style Application**: Applies dark background, blur, and placeholder text
3. **Content Preservation**: Stores original innerHTML in dataset
4. **Set Management**: Tracks masked elements in a Set data structure

#### Unmmasking Process
1. **Click Detection**: Detects clicks on already-masked elements
2. **Style Removal**: Removes all masking CSS properties
3. **Content Restoration**: Restores original innerHTML from dataset
4. **Set Cleanup**: Removes element from masked elements set

## 🎯 Use Cases

### Privacy Protection
- **Screen Sharing**: Hide sensitive information during video calls
- **Public Browsing**: Mask personal data when using public computers
- **Screenshots**: Create sanitized images for documentation
- **Presentations**: Hide confidential data during demos

### Content Creation
- **Tutorial Videos**: Mask personal information in instructional content
- **Documentation**: Create clean screenshots for user guides
- **Social Media**: Share browser screenshots without exposing private data
- **Bug Reports**: Submit screenshots with sensitive data hidden

### Professional Use
- **Client Demos**: Show software functionality without real data
- **Training Materials**: Create educational content with placeholder data
- **Compliance**: Meet privacy requirements for data handling
- **Security**: Prevent accidental exposure of confidential information

## 🔒 Privacy & Security

### What This Extension Does
- ✅ Masks content visually in your browser only
- ✅ Stores masking state locally using sessionStorage
- ✅ Works entirely offline after installation
- ✅ Provides completely reversible masking
- ✅ Does not collect or transmit any user data

### What This Extension Does NOT Do
- ❌ Prevent websites from collecting your data
- ❌ Send any information to external servers
- ❌ Modify form submissions or network requests
- ❌ Provide encryption or permanent data protection
- ❌ Work on Chrome internal pages (chrome://, extension pages)

### Important Notes
- This extension is for **visual privacy** only
- It hides content from screenshots and screen sharing
- It does **not** prevent websites from accessing your information
- Masked content is temporarily hidden, not deleted or encrypted
- Always be cautious about what information you enter on websites

## 🐛 Troubleshooting

### Extension Not Loading
- **Check Developer Mode**: Ensure it's enabled in `chrome://extensions/`
- **Verify Files**: Make sure all files exist in the project folder
- **Console Errors**: Check the browser console for error messages
- **Reload Extension**: Click the reload button on the extension card

### Masking Not Working
- **Compatible Pages**: Extension doesn't work on `chrome://` or `extension://` pages
- **Script Loading**: Try refreshing the page after installing extension
- **Console Logs**: Check browser console for JavaScript errors
- **Permission Issues**: Verify extension has access to the current site

### Button Not Responding
- **Page Compatibility**: Some pages may block content scripts
- **Extension State**: Try disabling and re-enabling the extension
- **Browser Restart**: Close and reopen Chrome completely
- **Clear Storage**: Clear browser data and reinstall extension

### Visual Issues
- **CSS Conflicts**: Some websites may override masking styles
- **Zoom Levels**: Try resetting browser zoom to 100%
- **Theme Conflicts**: Disable browser themes that might interfere
- **Hardware Acceleration**: Try disabling hardware acceleration in Chrome

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Development Setup
1. Fork the repository
2. Make your changes
3. Test thoroughly in Chrome
4. Submit a pull request with description

### Areas for Contribution
- **Enhanced Visual Effects**: Improve masking animations and styles
- **Keyboard Shortcuts**: Add hotkey support for common actions
- **Export/Import**: Save and load masking configurations
- **Multiple Mask Types**: Different masking styles for different content
- **Accessibility**: Improve support for screen readers and keyboard navigation

### Reporting Issues
1. **Check Existing Issues**: Look for similar problems first
2. **Provide Details**: Include browser version, extension version, and steps to reproduce
3. **Console Logs**: Include any error messages from browser console
4. **Screenshots**: Visual issues are easier to debug with images

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to the Chrome Extensions community for documentation and examples
- Inspired by privacy advocacy and the need for better personal data protection
- Built with modern web technologies and Chrome Extension Manifest V3
- Icon design from Reshot icon library

## 📞 Support

If you encounter issues or have questions:

1. Check the [troubleshooting section](#troubleshooting)
2. Open an issue on GitHub with detailed information
3. Review Chrome extension documentation for additional help

## 🔮 Future Enhancements

Potential features for future releases:

- **Bulk Operations**: Mask multiple elements with drag selection
- **Preset Configurations**: Save common masking patterns
- **Export Functionality**: Save masked page as image or PDF
- **Custom Mask Styles**: Different visual effects for different element types
- **Keyboard Navigation**: Tab through elements and mask with spacebar
- **Context Menu Integration**: Right-click to mask elements
- **Undo/Redo**: Step through masking history
- **Performance Optimization**: Faster masking for pages with many elements

---

**Made with ❤️ for privacy and productivity**
