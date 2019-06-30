# e-commerce
@hemhem 2020


### Cara main
- buat file `.env` dari template `.envTemplate`
- jalankan dev server, masuk ke folder server `npm run dev`

### API Route

::API `POST` harus menggunakan `Content-Type` header dengan nilai `application/json`::

## user

Route | HTTP | Header | BodyJSON / QueryParam | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/user/register` | POST | - | {email, fullName, password} | {_id, email, fullName, password} | register a user | email must be valid, name is more than 1 char
`/user/login` | POST | - | {email, password} | {access_token} | login: get token | -

## cart

Route | HTTP | Header | BodyJSON / QueryParam | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/cart` | POST | token | {product, qty} | {_id} | add to cart | -

## product
Route | HTTP | Header | BodyJSON / QueryParam | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/product` | GET | token | - | [{_id, name, price, image, stock, description }] | get products | -
`/product` | POST | token | {name, price, image, stock, description} | {name, price, image, stock, description, _id} | create a new product | -
`/product` | PATCH | token | {name, price, image, stock, description} | {name, price, image, stock, description, _id} | update a new product | -
`/product/:id` | DELTETE | token |  | {_id} | delete a product | -
