# tools-elevpc-faktura

All you need to generate invoices

# Setup

Add a local .env file.

```
AGREEMENT_SERVICE_URL=
AGREEMENT_SERVICE_SECRET=
DSF_SERVICE_URL=
DSF_SERVICE_SECRET=
MONGODB_CONNECTION=
MONGODB_COLLECTION=
MONGODB_COSMOS_RUS=
MONGODB_NAME=
KRR_SERVICE_URL=
KRR_SERVICE_JWT=
```

# Usage

Convert csv to json
```
$ npm run convert
```

Add invoice uid
```
$ npm run add:invoiceuid
```

Add dsf data
```
$ npm run add:dsfdata
```

Add recipient
```
$ npm run add:recipient
```

Generate invoice
```
$ npm run generate:invoice
```

Import invoices to system
```
$ npm run import:invoice
```

# License

[MIT](LICENSE)