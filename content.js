// Define the selector for the header you want to toggle
const headerSelectorData = [
  "[data-test-id='software-backlog.page-header']",
  ".css-cayjis",
];

const ninjaIcon = `<svg fill="#000000" width="16px" height="16px" viewBox="0 -64 640 640" style="margin-right: 2px"
  xmlns="http://www.w3.org/2000/svg">
  <g stroke-linecap="round" stroke-linejoin="round" stroke-width="0">
    <path
      d="M312 8C175 8 64 119 64 256s111 248 248 248 248-111 248-248c0-25.38-3.82-49.86-10.9-72.91l63.92 52.97L640 173.49l-98.2-10.89c-.65-1.6-1.31-3.19-2-4.77l94.89-40.43L595 61.64l-60.41 84.91C494.17 64.46 409.7 8 312 8zM191.99 256c0-9.3 4.1-17.5 10.5-23.4l-31-9.3c-8.5-2.5-13.3-11.5-10.7-19.9 2.5-8.5 11.4-13.2 19.9-10.7l80 24c8.5 2.5 13.3 11.5 10.7 19.9-2.1 6.9-8.4 11.4-15.3 11.4-.5 0-1.1-.2-1.7-.2.7 2.7 1.7 5.3 1.7 8.2 0 17.7-14.3 32-32 32s-32.1-14.3-32.1-32zm252.61-32.7l-31 9.3c6.3 5.8 10.5 14.1 10.5 23.4 0 17.7-14.3 32-32 32s-32-14.3-32-32c0-2.9.9-5.6 1.7-8.2-.6.1-1.1.2-1.7.2-6.9 0-13.2-4.5-15.3-11.4-2.5-8.5 2.3-17.4 10.7-19.9l80-24c8.4-2.5 17.4 2.3 19.9 10.7 2.5 8.5-2.3 17.4-10.8 19.9zm-265.19-52.28h262.56c42.35 0 54.97 49.74 53.8 83.99-1.18 34.83-41.79 72.53-72.23 72.53-61.58 0-73.62-40.25-112.85-40.28-39.23.03-51.27 40.28-112.85 40.28-30.44 0-71.05-37.7-72.23-72.53-1.17-34.25 11.45-83.99 53.8-83.99z" />
  </g>
</svg>`;

// Create the toggle button
function createToggleButton() {
  const button = document.createElement('button');

  button.innerHTML = `${ninjaIcon} Sweep Header`;

  button.id = 'toggleHeaderButton';
  button.style.position = 'absolute';
  button.style.top = '70px';
  button.style.right = '40px';
  button.style.padding = '8px';
  button.style.zIndex = '1000';
  button.style.borderRadius = '3px';
  button.style.display = 'flex';
  button.style.alignItems = 'center';
  button.style.justifyContent = 'center';
  button.style.cursor = 'pointer';
  button.style.backgroundColor = 'rgba(9, 30, 66, 0.04)';
  button.style.color = '#42526E';
  button.style.borderWidth = '0px';
  button.style.fontSize = '12px';
  button.style.height = "2.28571em";
  button.style.lineHeight = "2.28571em";

  document.body.appendChild(button);

  // Hover effects for more interactivity
  button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = '#e63946';
  });
  button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = 'rgba(9, 30, 66, 0.04)';
  });

  // Add event listener to toggle the header
  button.addEventListener('click', () => {
    chrome.storage.sync.get(['headerHidden'], (result) => {
      const hide = !result.headerHidden;
      chrome.storage.sync.set({ headerHidden: hide });
      toggleHeader(hide);
      button.innerHTML = `${ninjaIcon} ${hide ? 'Revive Header' : 'Sweep Header'}`;
    });
  });
}

// Function to toggle the header visibility
function toggleHeader(hide) {
  headerSelectorData.forEach((selector) => {
    const header = document.querySelector(selector);
    console.log('headerSelector', header);
    if (header) {
      if (hide) {
        // Create a 20px spacer element and insert it before the header
        const spacer = document.createElement('div');
        spacer.style.height = '20px';
        spacer.style.width = '100%';
        spacer.id = 'headerSpacer';

        // Insert spacer before the header
        header.parentNode.insertBefore(spacer, header);
        // Hide the header content
        header.style.display = 'none';
      } else {
        // Remove the spacer and restore the header
        const spacer = document.getElementById('headerSpacer');
        if (spacer) {
          spacer.remove();
        }
        header.style.display = '';  // Show the header again
      }
    }
  });
}

// Initial Setup: Check storage for the current state and set up the button
chrome.storage.sync.get(['headerHidden'], (result) => {
  createToggleButton();
  toggleHeader(result.headerHidden);
});