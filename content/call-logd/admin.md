# Administration

The oldest call logs are periodically removed by `xivo-purge-db`.

## Manual Generation

Call logs can also be generated manually. To do so, log on to the target
Wazo server and run:

    wazo-call-logs

To avoid running for too long in one time, the call logs generation is
limited to the `n` last unprocessed CEL entries (default `20,000`). This
means that successive calls to `wazo-call-logs` will process `n` more
CELs, making about `n/10` more calls available in call logs, going further
back in history, while processing new calls as well.

You can specify the number of CEL entries to consider. For example, to
generate calls using the `100,000` last unprocessed CEL entries:

    wazo-call-logs -c 100000

## Regeneration of call logs

Since call logs are based on CEL, they can be deleted and generated
without problems. To regenerate the last month of call logs:

    wazo-call-logs delete -d 30
    wazo-call-logs generate -d 30  // the default behavior of wazo-call-logs command is `generate`

## Technicals

Call logs are pre-generated from CEL entries. The generation is done
automatically by `wazo-call-logd`. wazo-call-logs is also run nightly to
generate call logs from CEL that were missed by `wazo-call-logd`.
