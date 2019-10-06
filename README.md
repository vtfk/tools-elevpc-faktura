# tools-elevpc-faktura

All you need to generate invoices

# Setup

Add a local .env file.

```
AGREEMENT_SERVICE_URL=
AGREEMENT_SERVICE_SECRET=
DSF_SERVICE_URL=
DSF_SERVICE_SECRET=
```

# Usasage

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

# License

[MIT](LICENSE)