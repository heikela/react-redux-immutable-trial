#!/bin/bash

git clone git@github.com:facebook/immutable-js.git
cd immutable-js
git checkout 9fcd9f8c7b45b7a2a3a00dedc1ad5b9b50634be6
git apply ../immutable-js.patch
npm install
npm run build
cd ..
