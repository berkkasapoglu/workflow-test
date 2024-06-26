# Github Actions Code Quality Check

> Bu dokümantasyon, ana branche commit atılmadan önce kodun sağlaması gereken şartların sağlanıp sağlanmadığı kontrol edilmesi için yapılacak adımları içermektedir.
>
> - Master Branchine merge ve commit öncesi testler ve eslint kontrolleri yapılıyor.
> - Jest, React Testing Library ve Cypress kullanılıyor.
>   - Jest ve React Testing Library için package.json dosyasına eklenen coverage thresholdları karşılanmazsa git actionsta hata veriliyor.
>   - PR merge yorumlarına 'coverage report' ekleniyor.

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

Aşağıdaki kodu package.json dosyasına kopyalayın. Bu coverage değerleri karşılanamazsa git actions başarısız olarak sonuçlanacaktır ve PR merge edilemeyecektir.

```
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 20,
        "functions": 20,
        "lines": 20,
        "statements": -10
      }
    }
  },
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

cypress:open scriptini çalıştırdıktan sonra browser açılacaktır. [Cypress dökümanındaki](https://docs.cypress.io/guides/getting-started/opening-the-app#The-Launchpad) adımları takip ettikten sonra cypress klasörü oluşacaktır. `'cypress'` klasörünün altında `tsconfig.json` dosyası oluşturun ve aşağıdaki kodu yapıştırın.

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

`Github` Repo Settings -> Actions -> General ekranında Workflow permissions ayarını "Read and write permissions" olarak değiştirin.

`.[github|gitea]/workflows` klasörü oluşturun. Bu klasörün altında `code-quality.yml` dosyası açıp içine aşağıdaki kodu yapıştırın ve dosyadaki node versiyonunu güncelleyin.

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
        uses: ArtiomTr/jest-coverage-report-action@v2
        with:
          skip-step: install
          test-script: "npm run test:coverage"
          annotations: failed-tests
      - name: Run Cypress
        uses: cypress-io/github-action@v6
```

Repo ayarlarına gidilerek yukarıdaki testlerden geçmediği sürece branchin mergelenmesini engellemek için status check ayarını açın.
