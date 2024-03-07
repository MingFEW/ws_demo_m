export default {
	balance: '0',
	wAddress: '',
	onDisconnectWallet() {
		console.log('OK toi roi');
		web3Lib.balance = '0';
		return web3Lib.balance;
	},
	async getBalanceOnChain () {
		if (!cWallet.wAddress) {
			this.balance = '0';
			return this.balance;
		}

		const rpc = "https://polygon-mumbai-pokt.nodies.app";
		const provider = new Web3.providers.HttpProvider(rpc);
		const web3 = new Web3(provider);

		const addr = cWallet.wAddress; // NO HARDCODE - Finding way to send this variable to othe wg

		try {
			let balance = await web3.eth.getBalance(addr);
			const res = web3.utils.fromWei(balance, 'ether');
			web3Lib.balance = res.toString();
		} catch {
			web3Lib.balance = '0';
		}
		// storeValue('wBalance', this.balance, true);
		return web3Lib.balance;
	}
}