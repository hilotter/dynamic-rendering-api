# Dynamic Rendering API

![dynamic_rendering](https://github.com/hilotter/dynamic-rendering-api/raw/master/doc/dynamic_rendering_api.png)

## Custom settings

```
cp .envrc.sapmle .envrc

export API_KEY=API_Key_value_should_be_at_least_20_character
```

## CDK deploy

```
yarn
yarn run cdk bootstrap

# dry-run
yarn run cdk diff

# deploy
yarn run deploy
```

## Lambda Test

use `test/lambda_event.json`

## Sample Request

```
curl 'https://your-api-gateway-url?url=https://github.com/' -H "x-api-key: your_api_key"
```
