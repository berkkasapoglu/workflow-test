# Github Actions Code Quality Check

> Bu dokümantasyon, ana branche commit atılmadan önce kodun sağlaması gereken şartların sağlanıp sağlanmadığı kontrol edilmesi için yapılacak adımları içermektedir.
>
> - Master Branchine merge ve commit öncesi test ve eslint kontrolleri yapılacak.

Package.json'a aşağıdaki scripts'i ekleyin.

```
  "scripts": {
    "lint": "eslint --config .pre-commit-eslint.cjs --no-eslintrc src/**/*.{ts,tsx,js,jsx}",
    "test:coverage": "CI=true react-scripts test --coverage",
  },
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

`Github` -> Repo Settings -> Actions -> General ekranında Workflow permissions ayarını "Read and write permissions" olarak değiştirin.

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
      - name: Run Lint
        run: npm run lint
      - name: Run Test
        run: npm run test:coverage
      - name: Report Coverage
        uses: tj-actions/coverage-reporter@v5.1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          lcov-file: ./coverage/lcov.info
      - name: Run Cypress
        uses: cypress-io/github-action@v6
```

Repo ayarlarına gidilerek yukarıdaki testlerden geçmediği sürece branchin mergelenmesini engellemek için status check ayarını açın.
