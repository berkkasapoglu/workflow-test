# Commit Convention Dokümantasyonu

Bu dokümantasyon, bir proje içinde commit mesajlarına uygun bir konvansiyon oluşturmak için adımları içermektedir.

## Adım 1: Prettier Kurulumu

```
npm install --save-dev --save-exact prettier
```

.prettierrc.json dosyasını oluşturun ve aşağaki konfigürasyonları dosyaya yapıştırın.

```
{
  "printWidth": 80,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": false,
  "useTabs": false
}
```

## Adım 1: Eslint Kurulumu

Eğer prebuild eslint konfigürasyonlarını uygulamak istiyorsanız aşağıdaki komutu çalıştırıp bu adımı atlayabilirsiniz.

```
npx eslint --init
```

---

```
npm i eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-react-hooks --save-dev
```

.eslintrc.json dosyasını oluşturun ve aşağıdaki konfigürasyonları dosyaya yapıştırın.

```
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "react"],
  "rules": {
     //add customize rules here as per your project's needs
  }
}
```

## Adım 2: Husky ve lint-staged Kurulumu

```
npm install husky lint-staged --save-dev
```

## Adım 4: package.json Ayarı

`package.json` dosyasında `scripts` objesinin içine aşağıdaki satırı ekleyin ve bu komutu çalıştırın.

`"husky-install": "husky install"`

```
npm run husky-install
```

## Adım 7: Pre-commit Hook Ayarı

Precommit hook'unu eklemek için aşağıdaki komutu çalıştırın.

```
npx husky add .husky/pre-commit 'npx lint-staged'
```

## Adım 5: Commitlint Kurulumu

```
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

## Adım 3: Commitlint Hook Ayarı

```
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

## Adım 9: Commitlint Konfigürasyon Dosyası

`.commitlintrc.js` adında bir dosya oluşturun ve içeriğini [commitlint/config-conventional README](https://github.com/conventional-changelog/commitlint/blob/master/%40commitlint/config-conventional/README.md) linkinden alabilirsiniz. Örnek dosya içeriği:

```javascript
export default {
  extends: ["@commitlint/config-conventional"],

  rules: {
    "type-enum": [
      2,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
};
```

## Adım 8: Eslint Dosyası Oluşturma

`.pre-commit-eslint.cjs` adında bir dosya oluşturun ve içine sadece commit esnasında çalışacak olan Eslint kurallarını ekleyin. **Örnek:**

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["eslint-plugin-no-inline-styles"],
  rules: {
    "no-console": ["error"],
    "no-debugger": "error",
    "no-duplicate-imports": "error",
    "no-use-before-define": "error",
    "default-case": "error",
    "no-inline-styles/no-inline-styles": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
  },
};
```

## Adım 10: package.json Güncelleme

`package.json` dosyasına aşağıdaki husky ve lint-staged konfigürasyonlarını ekleyin:

```
"husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "src/**/*.{ts,tsx,js,jsx}": [
      "npx eslint --config .pre-commit-eslint.cjs",
      "prettier --write"
    ]
  }
```

Commit öncesi çalışacak .pre-commit-eslint.cjs dosyasındaki eslint kurallarınız için gerekli olan dependencyleri yükleyin. **Örnek devDependencies:**

```
  "devDependencies": {
    "@commitlint/cli": "^18.4.3",
    "@commitlint/config-conventional": "^18.4.3",
    "@typescript-eslint/eslint-plugin": "^6.17.0",
    "@typescript-eslint/parser": "^6.17.0",
    "eslint": "^8.56.0",
    "eslint-plugin-no-inline-styles": "^1.0.5",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-testing-library": "^6.2.0",
    "eslint-plugin-unused-imports": "^3.0.0",
    "husky": "^8.0.3",
    "lint-staged": "^15.2.0"
  }
```

Bu adımları takip ederek, proje içinde commit mesajlarına uygun bir konvansiyon oluşturmuş olacaksınız.
