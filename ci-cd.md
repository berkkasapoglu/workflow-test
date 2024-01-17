# Github Actions Code Quality Check

> Bu dokümantasyon, ana branche commit atılmadan önce kodun sağlaması gereken şartların sağlanıp sağlanmadığı kontrol edilmesi için yapılacak adımları içermektedir.
>
> - Master Branchine merge ve commit öncesi test ve eslint kontrolleri yapılacak.

Package.json'a aşağıdaki scripti ekleyin.

```
    "lint": "eslint --config .pre-commit-eslint.cjs --no-eslintrc src/*.{ts,tsx,js,jsx}"
```

## Jest Ve Testing Library Kurulumu

Eğer projeyi create-react-app ile oluşturduysanız aşağıdakileri yapmanıza gerek yoktur.

```
npm i @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

```
npm i @types/jest --save-dev
```

## Cypress Kurulumu

```
npm install cypress --save-dev
```

Aşağıdaki scripti package.json'a ekleyin ve çalıştırın.

```
{
"scripts": {
    "cypress:open": "cypress open"
 }
}
```

```
npm run cypress:open
```

cypress:open scriptini çalıştırdıktan sonra browser açılacaktır. [Cypress dökümanındaki](https://docs.cypress.io/guides/getting-started/opening-the-app#The-Launchpad) adımları takip ettikten sonra cypress klasörü oluşacaktır. 'cypress' klasörünün altında tsconfig.json dosyası oluşturun ve aşağıdaki kodu yapıştırın.

```
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
```

## Github Actions Yaml dosyasının hazırlanması

Aşağıdaki yaml dosyası .github/workflows klasörü oluşturulup içine yapıştırın ve dosyadaki node versiyonunu değiştirin.

```
name: Code Quality Check

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  code-quality-workflow:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
      - name: Use Node.js 16.x
        uses: actions/setup-node@v2
        with:
          node-version: 16.x
      - name: npm i
        run: npm i
      - name: Run Test
        run: npm test
      - name: Cypress Run
        uses: cypress-io/github-action@v6
      - name: Run Lint
        run: npm run lint
```

Repo ayarlarına gidilerek yukarıdaki testlerden geçmediği sürece branchin mergelenmesini engellemek için status check ayarını açın.
