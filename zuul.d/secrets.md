{
    # Get them from https://www.algolia.com/apps/LH48PBHM7P/api-keys/all
    echo -n "$1" | zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name algolia --field-name appId
    # Admin API Key
    echo -n "$2" | zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name algolia --field-name apiKey
    # Search-Only API Key
    echo -n "$3" | zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name algolia --field-name publicKey

    # $4 is the path to publication private key
    zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name publication --field-name private_key <"$4"

    # Gt it from https://mm.wazo.community/wazo/integrations/incoming_webhooks (the URL last part only !)
    echo -n "$5" | zuul-client encrypt --tenant local --project github.com/wazo-platform/wazo-platform.org --secret-name mattermost --field-name api_key
}
