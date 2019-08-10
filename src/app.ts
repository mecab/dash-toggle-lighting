import rp from 'request-promise-native';
import dashButton from 'node-dash-button';

const WEBHOOK_KEY=process.env.WEBHOOK_KEY;
const DASH_MAC=process.env.DASH_MAC;
const IFACE = process.env.IFACE

if (!WEBHOOK_KEY) {
    console.error('Specify WEBHOOK_KEY environment variable');
    process.exit(1);
}

if (!DASH_MAC) {
    console.error('Specify DASH_MAC environment variable');
    process.exit(1);
}

const dash = dashButton(DASH_MAC as string, IFACE, 1000, 'all');
dash.on('detected', async (dashId): Promise<void> => {
    console.log(`Button pressed by ${dashId}`);
    try {
        rp.post({
            uri: `https://maker.ifttt.com/trigger/dash_hue_bed_dimmed/with/key/${WEBHOOK_KEY}`,
        });
    }
    catch (err) {
        console.error(`Failed to fire webhook. ${err.message}`, err);
    }
    console.log('IFTTT webhook fired.')
})
