
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
