# Github Actions Code Quality Check

> Bu dokümantasyon, ana branche commit atılmadan önce kodun sağlaması gereken şartların sağlanıp sağlanmadığı kontrol edilmesi için yapılacak adımları içermektedir.
>
> - Master Branchine merge ve commit öncesi test ve eslint kontrolleri yapılacak.

Package.json'a aşağıdaki script ekleyin.

```
    "lint": "eslint --config .pre-commit-eslint.cjs --no-eslintrc src/*.{ts,tsx,js,jsx}"
```

Aşağıdaki yaml dosyası .github/workflows klasörü oluşturulup içine yapıştırın ve node versiyonunu değiştirin.

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
      - name: Use Node
        uses: actions/setup-node@v2
        with:
          node-version: 16.x
      - name: npm i
        run: npm i
      - name: Run Test
        run: npm test
      - name: Run Lint
        run: npm run lint
```

Repo ayarlarına gidilerek yukarıdaki testlerden geçmediği sürece branchin mergelenmesini engellemek için status check ayarını açın.
