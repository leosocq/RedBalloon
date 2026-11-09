
function exportGP()
{
    const exporter = new alphaTab.exporter.Gp7Exporter();
    const data = exporter.export(api.score, api.settings);

    const fileName = (api.score.title || 'Untitled') + '.gp';
    const url = URL.createObjectURL(new Blob([data], { type: 'application/octet-stream' }));

    const a = document.createElement('a');
    a.download = fileName;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}