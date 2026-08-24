## Terminology

### Back-end

A back-end is a connector to query a specific type of directory, e.g. one back-end to query LDAP servers, another back-end to query CSV files, etc.

### Display

A display is a lookup result formatting configuration. It defines the type, order, name and default values of each columns.

### Favorite

A favorite is a contact from any source that has been marked as favorite

### Profile

A set of configuration that is used when a user does a lookup or a reverse lookup. The profile includes which sources are used when doing a lookup, a reverse lookup and a favorite lookup. It also defines which `display` is used when doing a lookup.

### Source

A source is an instance of a back-end. One backend may be used multiples times to query multiple directories of the same type. For example, I could have the customer-csv and the employee-csv sources, each using the CSV back-end, but reading a different file.

### Plugins

A plugin is an extension point in wazo-dird. It is a way to add or modify the functionality of wazo-dird. There are currently three types of plugins:

Back-ends to query different types of directories (LDAP, CSV, etc.)
Views to expose directory results in different formats (JSON, XML, etc.)

