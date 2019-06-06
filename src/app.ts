import dashButton from 'node-dash-button';

const dash = dashButton('68:37:E9:F0:5A:78', 'eth0');
dash.on('detected', (dashId) => {
    console.log('detected!', dashId);
})
