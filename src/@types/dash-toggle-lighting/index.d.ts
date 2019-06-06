interface DashButtonEvent {
    on(event: 'detected', cb: (dashId: string) => void): void
}

declare module "node-dash-button" {
    function dashButton(macAddresses: string | string[], iface?: string, timeout?: number, protocol?: 'arp' | 'udp' | 'all'): DashButtonEvent;
    export = dashButton;
}