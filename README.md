# e-commerce
@hemhem 2020


### Cara main
- buat file `.env` dari template `.envTemplate`
- jalankan dev server, masuk ke folder server `npm run dev`

### API Route

::API `POST` harus menggunakan `Content-Type` header dengan nilai `application/json`::

Route | HTTP | Header | BodyJSON / QueryParam | Response | Description | Validation
-- | -- | -- | -- | -- | -- | --
`/user/register` | POST | - | {email, password} | {_id, email, password} | register a user | email must be valid
`/user/login` | POST | - | {email, password} | {access_token} | login: get token | -
`/article` | POST | token | {textData, quillData, dueDate, name, htmlData} | {textData, quillData, dueDate, name _id} | create a new article | -
`/article` | GET | - | - | [{ name, textData, quillData, dueDate, status, htmlData, _id }] | get list of article | -
`/article/:id` | GET | - | - | { name, textData, quillData, dueDate, status } | get single article | -
`/article/:id` | DELETE | token | - | - | delete a article | -
`/article/:id` | PATCH | token | { textData, quillData, name, dueDate, status, htmlData} | { name, textData, quillData, dueDate, status } | update article | -
