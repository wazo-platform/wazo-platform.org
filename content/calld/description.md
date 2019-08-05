# wazo-calld

wazo-calld is the call control service for the Wazo platform.

It manages the following resources:

* applications
* calls
* fax
* relocates
* switchboards
* transfers
* voicemails

## API documentation

The REST API for wazo-calld is available [here](http://developers.wazo.io/api/application.html#tag/applications).

The bus events are defined [here](https://github.com/wazo-pbx/wazo-calld/blob/master/wazo_calld/plugins/calls/events.yml) and [here](https://github.com/wazo-pbx/wazo-calld/blob/master/wazo_calld/plugins/switchboards/events.yml).

## Schema

![schema](diagram.svg)

## Example

![Sequence diagram](sequence-diagram.svg)

## Related

* [wazo-auth](authentication.html)
* [wazo-confd](configuration.html)
* [xivo-amid](amid.html)
