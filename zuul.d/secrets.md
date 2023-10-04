# Encrypting secrets with zuul-client on SF 3.8

Because the zuul-client is actrually a container, it doesn't support the `echo -n $unencrypted_secret | zuul-client ...` anymore. Instead, we have to use an infile and an outfile. The infile must be created in /etc/zuul.

```
echo -n $unencrypted_secret > /etc/zuul/unencrypted_secret_infile
zuul-client encrypt --tenant local --project github.com/org/project --secret-name secret_name --field-name filed_name --infile /etc/zuul/unencrypted_secret_infile --outfile /etc/zuul/encrypted_secret_outfile.yaml
```

Specifically for this repository:

```
    # Algolia secrets
    # Get them from https://www.algolia.com/apps/LH48PBHM7P/api-keys/all
    echo -n $appId_unencrypted > /etc/zuul/appId_unencrypted
    zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name algolia --field-name appId --infile /etc/zuul/appId_unencrypted --outfile /etc/zuul/appId.yaml

    # Admin API Key
    echo -n $apiKey_unencrypted > /etc/zuul/apiKey_unencrypted
    zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name algolia --field-name apiKey --infile /etc/zuul/apiKey_unencrypted --outfile /etc/zuul/apiKey.yaml

    # Search-Only API Key
    echo -n $publicKey_unencrypted > /etc/zuul/publicKey_unencrypted
    zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name algolia --field-name publicKey --infile /etc/zuul/publicKey_unencrypted --outfile /etc/zuul/publicKey.yaml

    # publication secret
    # $4 is the path to publication private key. WARNING: requires option `--no-strip`
    echo -n $zuul-publisher_key_unencrypted > /etc/zuul/zuul-publisher_key_unencrypted
    zuul-client encrypt --no-strip --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name publication --field-name private_key --infile /etc/zuul/zuul-publisher_key_unencrypted --outfile /etc/zuul/zuul-publisher_key.yaml

    # Mattermost secret
    # Gt it from https://mm.wazo.community/wazo/integrations/incoming_webhooks (the URL last part only !)
    echo -n $mm_webhook_id_unencrypted > /etc/zuul/mm_webhook_id_unencrypted
    zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name mattermost --field-name api_key --infile /etc/zuul/mm_webhook_id_unencrypted --outfile /etc/zuul/mm_webhook_id.yaml    

```


**Note: Make sure to remove the unencrypted files once you wre able to generate the encrypted values**