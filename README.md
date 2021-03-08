# create-template-folder

## Instalation

```sh
npm install create-template-folder
# OR
yarn add create-template-folder
```

## Usage
```js
const { copyTemplate } = require("create-template-folder")
const path = require("path")

async function main() {
   try {
      const files = await copyTemplate({
         inDir: path.join(__dirname, "template"),
         outDir: path.join(__dirname, "..", "outFolder"),
         vars: {
            hello: "world"
         }
      })
      files.forEach(file => {
         console.log(`Just created ${file}`)
      })
   } catch (err) {
      console.log(err)
   }
}

main()
```

#### Typescript support
```ts
import { copyTemplate } from 'create-template-folder'
import * as path from 'path'


async function main() {
   try {
      const files = await copyTemplate({
         inDir: path.join(__dirname, "template"),
         outDir: path.join(__dirname, "..", "outFolder"),
         vars: {
            hello: "world"
         }
      })
      files.forEach(file => {
         console.log(`Just created ${file}`)
      })
   } catch (err) {
      console.log(err)
   }
}

main()
```

### Interfacing with api
#### copyTemplate(ICopyDir)

```ts
interface ICopyDir {
  inDir: string;
  outDir: string;
  vars: Record<string, string>; // defaults to {}
  number?: number; // defaults to 2
}
```
**inDir**: Folder you are trying to copy

**ouDir**: Path to where the new folder should be copied to

**vars**: List of variables that the package should be looking into in order to override with your custom values

**number**: Number of "curly braces" the package should look into: `{{hello}}` vs `{{{hello}}}` for example


#### copyTemplate(inDir, outDir, vars, number)
```ts
copyTemplate(inDir: string, outDir: string, vars?: Record<string, string>,  number?: number) {}
```

Same api structure as before, just without sending an object and passing positional arguments