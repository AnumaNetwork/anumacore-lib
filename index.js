'use strict';


const secp256k1 = require('secp256k1-wasm');
const blake2b = require('blake2b-wasm');


var anumacore = module.exports;

anumacore.secp256k1 = secp256k1;

// module information
anumacore.version = 'v' + require('./package.json').version;
anumacore.versionGuard = function(version) {
	if (version !== undefined) {
		var message = 'More than one instance of anumacore-lib found. ' +
			'Please make sure to require anumacore-lib and check that submodules do' +
			' not also include their own anumacore-lib dependency.';
		throw new Error(message);
	}
};
anumacore.versionGuard(global._anumacoreLibVersion);
global._anumacoreLibVersion = anumacore.version;


const wasmModulesLoadStatus = new Map();
anumacore.wasmModulesLoadStatus = wasmModulesLoadStatus;
wasmModulesLoadStatus.set("blake2b", false);
wasmModulesLoadStatus.set("secp256k1", false);

const setWasmLoadStatus = (mod, loaded) => {
	//console.log("setWasmLoadStatus:", mod, loaded)
	wasmModulesLoadStatus.set(mod, loaded);
	let allLoaded = true;
	wasmModulesLoadStatus.forEach((loaded, mod) => {
		//console.log("wasmModulesLoadStatus:", mod, loaded)
		if (!loaded)
			allLoaded = false;
	})

	if (allLoaded)
		anumacore.ready();
}


blake2b.ready(() => {
	setWasmLoadStatus("blake2b", true);
})

secp256k1.onRuntimeInitialized = () => {
	//console.log("onRuntimeInitialized")
	setTimeout(() => {
		setWasmLoadStatus("secp256k1", true);
	}, 1);
}

secp256k1.onAbort = (error) => {
	console.log("secp256k1:onAbort:", error)
}
const deferred = ()=>{
	let methods = {};
	let promise = new Promise((resolve, reject)=>{
		methods = {resolve, reject};
	})
	Object.assign(promise, methods);
	return promise;
}
const readySignal = deferred();

anumacore.ready = ()=>{
	readySignal.resolve(true);
}
anumacore.initRuntime = ()=>{
	return readySignal;
}


// crypto
anumacore.crypto = {};
anumacore.crypto.BN = require('./lib/crypto/bn');
anumacore.crypto.ECDSA = require('./lib/crypto/ecdsa');
anumacore.crypto.Schnorr = require('./lib/crypto/schnorr');
anumacore.crypto.Hash = require('./lib/crypto/hash');
anumacore.crypto.Random = require('./lib/crypto/random');
anumacore.crypto.Point = require('./lib/crypto/point');
anumacore.crypto.Signature = require('./lib/crypto/signature');

// encoding
anumacore.encoding = {};
anumacore.encoding.Base58 = require('./lib/encoding/base58');
anumacore.encoding.Base58Check = require('./lib/encoding/base58check');
anumacore.encoding.BufferReader = require('./lib/encoding/bufferreader');
anumacore.encoding.BufferWriter = require('./lib/encoding/bufferwriter');
anumacore.encoding.Varint = require('./lib/encoding/varint');

// utilities
anumacore.util = {};
anumacore.util.buffer = require('./lib/util/buffer');
anumacore.util.js = require('./lib/util/js');
anumacore.util.preconditions = require('./lib/util/preconditions');
anumacore.util.base32 = require('./lib/util/base32');
anumacore.util.convertBits = require('./lib/util/convertBits');
anumacore.setDebugLevel = (level)=>{
	anumacore.util.js.debugLevel = level;
}

// errors thrown by the library
anumacore.errors = require('./lib/errors');

// main bitcoin library
anumacore.Address = require('./lib/address');
anumacore.Block = require('./lib/block');
anumacore.MerkleBlock = require('./lib/block/merkleblock');
anumacore.BlockHeader = require('./lib/block/blockheader');
anumacore.HDPrivateKey = require('./lib/hdprivatekey.js');
anumacore.HDPublicKey = require('./lib/hdpublickey.js');
anumacore.Networks = require('./lib/networks');
anumacore.Opcode = require('./lib/opcode');
anumacore.PrivateKey = require('./lib/privatekey');
anumacore.PublicKey = require('./lib/publickey');
anumacore.Script = require('./lib/script');
anumacore.Transaction = require('./lib/transaction');
anumacore.URI = require('./lib/uri');
anumacore.Unit = require('./lib/unit');

// dependencies, subject to change
anumacore.deps = {};
anumacore.deps.bnjs = require('bn.js');
anumacore.deps.bs58 = require('bs58');
anumacore.deps.Buffer = Buffer;
anumacore.deps.elliptic = require('elliptic');
anumacore.deps._ = require('lodash');

// Internal usage, exposed for testing/advanced tweaking
anumacore.Transaction.sighash = require('./lib/transaction/sighash');