# Encrypting secrets with zuul-client on SF 3.8

Because the zuul-client is actually a container, it doesn't support the
`echo -n $unencrypted_secret | zuul-client ...` anymore. Instead, we have to
use an infile and an outfile. The infile must be created in /etc/zuul.

```sh
echo -n $unencrypted_secret > /etc/zuul/unencrypted_secret_infile
zuul-client encrypt --tenant local --project github.com/org/project --secret-name secret_name --field-name filed_name --infile /etc/zuul/unencrypted_secret_infile --outfile /etc/zuul/encrypted_secret_outfile.yaml
```

Specifically for this repository:

```sh
    # Mattermost secret
    # Gt it from https://mm.wazo.community/wazo/integrations/incoming_webhooks (the URL last part only !)
    echo -n $mm_webhook_id_unencrypted > /etc/zuul/mm_webhook_id_unencrypted
    zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name mattermost --field-name api_key --infile /etc/zuul/mm_webhook_id_unencrypted --outfile /etc/zuul/mm_webhook_id.yaml
```

Note: make sure to remove the unencrypted files once you were able to generate
the encrypted values.
