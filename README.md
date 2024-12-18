JavaScript Data Primitives Library for Anuma
=============================================

**PLEASE NOTE: This project is under heavy development and is not production ready**

Based on the popular [Bitcore library](https://github.com/bitpay/bitcore) developed by BitPay for the Bitcoin, Anumacore library provides primitives for interfacing with the Anuma network.

Get Started
-----------

```sh
git clone git@github.com:AnumaNetwork/anumacore-lib
```

Adding Anumacore to your app's `package.json`:

```json
"dependencies": {
    "AnumaNetwork/anumacore-lib": "*"
}
```

Anuma adaptation
----------------

Anumacore library provides primitives such as Transaction and UTXO data structures customized for use with the next-generation high-performance Anuma network.

Documentation
-------------

The complete docs are hosted here: [bitcore documentation](https://github.com/bitpay/bitcore). There's also a [bitcore API reference](https://github.com/bitpay/bitcore/blob/master/packages/bitcore-node/docs/api-documentation.md) available generated from the JSDocs of the project, where you'll find low-level details on each bitcore utility.


Building the Browser Bundle
---------------------------

To build a anumacore-lib full bundle for the browser:

```sh
gulp browser
```

This will generate files named `anumacore-lib.js` and `anumacore-lib.min.js`.

You can also use our pre-generated files, provided for each release along with a PGP signature by one of the project's maintainers. To get them, checkout the [releases](https://github.com/bitpay/bitcore/blob/master/packages/bitcore-lib/CHANGELOG.md).


Contributing
------------

See [CONTRIBUTING.md](https://github.com/bitpay/bitcore/blob/master/Contributing.md) on the main bitcore repo for information about how to contribute.

License
-------

Code released under [the MIT license](https://github.com/bitpay/bitcore/blob/master/LICENSE).

Bitcore - Copyright 2013-2019 BitPay, Inc. Bitcore is a trademark maintained by BitPay, Inc.  
Anumacore - Copyright 2020 ASPECTRON Inc.
