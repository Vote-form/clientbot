const WalletConnect = require('@walletconnect/client').default;
const QRCodeModal = require('@walletconnect/qrcode-modal');

function generateWalletConnectUri() {
  return new Promise((resolve, reject) => {
    const connector = new WalletConnect({
      bridge: 'https://bridge.walletconnect.org',
      qrcodeModal: QRCodeModal
    });

    if (!connector.connected) {
      connector.createSession()
        .then(() => {
          resolve(connector.uri);
        })
        .catch(reject);
    } else {
      resolve(connector.uri);
    }
  });
}

module.exports = { generateWalletConnectUri };