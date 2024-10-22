# Browser Data Exporter

## Overview

The **Browser Data Exporter** is a simple JavaScript function that allows users to export their browser data, including cookies, local storage, and session storage, into a JSON file. This can be useful for backing up data or transferring it to another application.

## Features

- **Exports Cookies**: Retrieves and formats all cookies stored in the browser.
- **Exports Local Storage**: Collects all key-value pairs from the local storage.
- **Exports Session Storage**: Gathers all key-value pairs from the session storage.
- **Downloads as JSON**: Packages the data into a JSON format and prompts the user to download it as a file.

## How It Works

1. The function retrieves cookies by splitting the `document.cookie` string.
2. It iterates through `localStorage` and `sessionStorage`, collecting all key-value pairs.
3. The collected data is organized into a JavaScript object.
4. The object is converted to a JSON string and a Blob is created.
5. An anchor element is dynamically created to facilitate the download of the JSON file.
6. The download is triggered, and the anchor element is removed from the document.

## Usage

To use the Browser Data Exporter, follow these steps:

1. Open your web browser and navigate to the console (usually accessible via `F12` or `Ctrl + Shift + I`).
2. Copy and paste the entire function below into the console and press Enter:

```javascript
function exportBrowserData() {
  const cookies = document.cookie.split('; ').map(cookie => {
    const [name, value] = cookie.split('=');
    return { name, value };
  });

  const localStorageData = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    localStorageData.push({ key, value: localStorage.getItem(key) });
  }

  const sessionStorageData = [];
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    sessionStorageData.push({ key, value: sessionStorage.getItem(key) });
  }

  const exportedData = {
    cookies,
    localStorage: localStorageData,
    sessionStorage: sessionStorageData
  };

  const jsonString = JSON.stringify(exportedData, null, 2);

  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'browser_data_export.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  console.log('Exported Browser Data:', exportedData);
}

exportBrowserData();
```

3. After running the function, a download prompt will appear for a file named `browser_data_export.json`.

## Important Notes

- The function will only work on web pages that have access to `document.cookie`, `localStorage`, and `sessionStorage`.
- Ensure that you respect privacy and legal considerations when exporting and handling browser data.
- This function is intended for personal use and testing purposes only.

