# Element Masker Installation & Testing Guide

## 📦 Installation Steps

### 1. Load Extension in Chrome (Development Mode)

1. **Open Chrome Extensions Page**
   ```
   Navigate to: chrome://extensions/
   ```

2. **Enable Developer Mode**
   - Click the toggle switch in the top-right corner labeled "Developer mode"

3. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Navigate to your project folder: `/Users/bruhunna/Projects/personal-projects/chrome-ext-masking`
   - Select the folder and click "Open"

4. **Verify Installation**
   - The extension should appear in your extensions list as "Element Masker"
   - You should see the masker icon in your Chrome toolbar
   - No errors should appear in the extensions page

## 🧪 Testing Your Manual Element Masking

### Quick Test Workflow

1. **Open any website** (try the included test-page.html)
2. **Click the Element Masker icon** in your toolbar
3. **Click "Activate Masking Mode"**
   - Button should turn red and say "Deactivate Masking Mode"
   - You should see message: "Masking mode activated! Click elements to mask them."
4. **Hover over page elements** - they should get blue outlines
5. **Click elements** - they should turn dark with ██████ text
6. **Click masked elements again** - they should return to normal
7. **Click "Deactivate Masking Mode"** - all masks should disappear

### Detailed Testing Checklist

#### ✅ Extension Loading
- [ ] Extension appears in chrome://extensions/ without errors
- [ ] Icon visible in Chrome toolbar
- [ ] Popup opens when clicking icon
- [ ] No console errors in background page

#### ✅ Basic Functionality
- [ ] "Activate Masking Mode" button works
- [ ] Button changes color and text when activated (blue → red)
- [ ] Success message appears when activated
- [ ] Elements show blue outline on hover
- [ ] Elements get masked when clicked (dark background + ██████)
- [ ] Masked elements can be unmasked by clicking again
- [ ] "Deactivate Masking Mode" clears all masks

#### ✅ Visual Effects
- [ ] Blue outline appears on hover (not on masked elements)
- [ ] Masked elements have dark background
- [ ] Masked elements show ██████ placeholder text
- [ ] Blur effect is applied to masked elements
- [ ] Smooth transitions between states
- [ ] Cursor changes to "not-allowed" on masked elements

#### ✅ State Persistence
- [ ] Masking mode stays active after page refresh
- [ ] Individual masked elements stay masked after refresh
- [ ] Extension popup shows correct state when reopened
- [ ] Masking mode persists when navigating to new pages

#### ✅ Error Handling
- [ ] Appropriate error message on Chrome internal pages
- [ ] Graceful handling when content script not loaded
- [ ] No JavaScript errors in browser console
- [ ] Extension works on various website types

## 🔧 Test Pages

### Use the Included Test Page

The extension includes a test page with various content types:

```bash
# Open the test page
open /Users/bruhunna/Projects/personal-projects/chrome-ext-masking/test-page.html
```

Test masking different types of content:
- Text paragraphs
- Headlines and titles
- Form inputs and textareas
- Images and media
- Navigation links
- Dynamic content (appears after 3 seconds)

### Test on Real Websites

Try the extension on various sites:
- **News websites** (CNN, BBC, etc.)
- **Social media** (Twitter, Reddit, etc.)
- **E-commerce** (Amazon, eBay, etc.)
- **Documentation sites** (GitHub, Stack Overflow, etc.)

## 🐛 Common Issues and Solutions

### Issue: Extension Won't Load
**Symptoms**: Error messages in chrome://extensions/
**Solutions**:
- Check that all files exist in the project folder
- Verify manifest.json syntax with: `python3 -m json.tool manifest.json`
- Ensure you have the latest Chrome version
- Remove and reload the extension

### Issue: Popup Doesn't Open
**Symptoms**: Clicking icon does nothing
**Solutions**:
- Check popup.html exists and has correct syntax
- Verify popup.js has no JavaScript errors
- Try right-clicking icon and selecting extension name
- Reload the extension

### Issue: Masking Mode Won't Activate
**Symptoms**: Button click has no effect
**Solutions**:
- Check browser console for JavaScript errors
- Verify you're not on a Chrome internal page (chrome://, extension://)
- Ensure content script loaded (check page source)
- Try refreshing the page first

### Issue: Elements Don't Highlight on Hover
**Symptoms**: No blue outline appears
**Solutions**:
- Ensure masking mode is actually activated (button should be red)
- Check CSS is being injected (inspect element styles)
- Verify no website CSS is overriding styles
- Try on a simpler test page

### Issue: Elements Don't Mask When Clicked
**Symptoms**: Click has no effect or wrong behavior
**Solutions**:
- Check browser console for JavaScript errors
- Verify click event listeners are attached
- Ensure you're clicking during masking mode
- Try clicking different types of elements

### Issue: Masks Don't Persist After Page Reload
**Symptoms**: Masked elements return to normal after refresh
**Solutions**:
- Check sessionStorage is working (inspect Application tab)
- Verify content script loads on page reload
- Ensure no website is clearing sessionStorage
- Try on different websites

## 🔍 Debugging Tips

### Browser Console Debugging
1. **Open Developer Tools** (F12)
2. **Check Console tab** for errors
3. **Look for extension messages**:
   - "Element Masking: ACTIVATED"
   - "Element Masking: DEACTIVATED"
   - "Element Masking: Auto-activated on page load."

### Extension Background Debugging
1. **Go to chrome://extensions/**
2. **Find Element Masker extension**
3. **Click "service worker" link** (if available)
4. **Check for background script errors**

### Content Script Debugging
1. **Open any webpage**
2. **Open Developer Tools (F12)**
3. **Go to Sources tab**
4. **Look for content.js in the file tree**
5. **Set breakpoints to debug masking logic**

### Popup Debugging
1. **Right-click extension icon**
2. **Select "Inspect popup"**
3. **Debug popup.js in the opened developer tools**

## 📋 Performance Testing

### Test on Different Page Types
- [ ] Simple HTML pages
- [ ] JavaScript-heavy single page applications
- [ ] Pages with many DOM elements (1000+)
- [ ] Sites with heavy CSS animations
- [ ] Mobile responsive layouts

### Test Edge Cases
- [ ] Pages that load content dynamically
- [ ] Sites with infinite scroll
- [ ] Pages with iframes
- [ ] Sites that modify DOM frequently
- [ ] Pages with shadow DOM elements

## 🚀 Ready for Production?

Before publishing your extension:

### Code Quality
- [ ] No console errors or warnings
- [ ] Clean, commented code
- [ ] Proper error handling throughout
- [ ] Performance optimized for large pages

### User Experience
- [ ] Intuitive interface design
- [ ] Clear visual feedback
- [ ] Helpful error messages
- [ ] Smooth animations and transitions

### Compatibility
- [ ] Works on major websites
- [ ] Compatible with different Chrome versions
- [ ] Handles various content types
- [ ] Graceful degradation on unsupported pages

### Documentation
- [ ] Complete README with usage instructions
- [ ] Installation guide
- [ ] Troubleshooting section
- [ ] Screenshots and demos

## 📞 Getting Help

If you encounter issues during testing:

1. **Check this troubleshooting guide** first
2. **Review browser console** for error messages
3. **Test on the included test-page.html** to isolate issues
4. **Try the extension on multiple websites**
5. **Verify Chrome version compatibility**

Your Element Masker extension should now be working perfectly for manual element selection and masking!
