const fs = require('fs');
const https = require('https');

const files = [
  { name: 'home.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzhjZWUyYzdhYzRhMDRkNWRiYjc2MzQ3ZTRjNThhN2Q0EgsSBxDisarDpAoYAZIBIwoKcHJvamVjdF9pZBIVQhMzMzI3NTQzNTAzODA1ODM3MjY2&filename=&opi=89354086' },
  { name: 'contact.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzU3M2ZlYzlmMDJkMDQ5ZGRiZWQxMzRkNmQwZDA2ZmRkEgsSBxDisarDpAoYAZIBIwoKcHJvamVjdF9pZBIVQhMzMzI3NTQzNTAzODA1ODM3MjY2&filename=&opi=89354086' },
  { name: 'about.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzc2ZDE0ZTE4YzVlZDQxYzI5MDA2MzNlOTVmNTdiOTQ3EgsSBxDisarDpAoYAZIBIwoKcHJvamVjdF9pZBIVQhMzMzI3NTQzNTAzODA1ODM3MjY2&filename=&opi=89354086' },
  { name: 'tour-detail.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2JmNzE3MTFmN2FkMzQ5MDBiMmUxNmNjMjJlMTM2ZjMwEgsSBxDisarDpAoYAZIBIwoKcHJvamVjdF9pZBIVQhMzMzI3NTQzNTAzODA1ODM3MjY2&filename=&opi=89354086' },
  { name: 'tours-listing.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzAxNGI1OWRiZDU3MDRlNzc5MDJkYzJhYWFkNmNjNDI3EgsSBxDisarDpAoYAZIBIwoKcHJvamVjdF9pZBIVQhMzMzI3NTQzNTAzODA1ODM3MjY2&filename=&opi=89354086' },
  { name: 'blog-listing.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2MxZjYxZTliODBkYzQyZTc4YWViNjEzOTdiMDZhNDQzEgsSBxDisarDpAoYAZIBIwoKcHJvamVjdF9pZBIVQhMzMzI3NTQzNTAzODA1ODM3MjY2&filename=&opi=89354086' },
  { name: 'destinations.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzA0MTQ4N2MzZDIwODRjOTc4YTI5ZTM1Y2UwY2FkYzAzEgsSBxDisarDpAoYAZIBIwoKcHJvamVjdF9pZBIVQhMzMzI3NTQzNTAzODA1ODM3MjY2&filename=&opi=89354086' },
  { name: 'custom-trip.html', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2JkYjJhMWNlZTllZjQ5YTdiY2M3NDhlMTgxMDczMGZiEgsSBxDisarDpAoYAZIBIwoKcHJvamVjdF9pZBIVQhMzMzI3NTQzNTAzODA1ODM3MjY2&filename=&opi=89354086' }
];

if (!fs.existsSync('stitch_design')) {
  fs.mkdirSync('stitch_design');
}

files.forEach(file => {
  const req = https.get(file.url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      fs.writeFileSync('stitch_design/' + file.name, data);
      console.log('Downloaded ' + file.name);
    });
  });
  req.on('error', (e) => {
    console.error('Error downloading ' + file.name + ': ' + e.message);
  });
});
