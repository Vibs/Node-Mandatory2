# Node-Mandatory2


1. Tildel variablerne værdier i .evn_sample og omdøb den til .env
2. Hvis der ikke ligger en nodefolio.db-fil i roden, så kør kommandoen i terminalen:
        npm run create-sqlite-db
            OG
        npm run create-admin-db
    Så kører de 2 scripter, som er defineret i package.json
3. Åben to terminaler
    1. i den ene køres:
            npm run devStart
    2. i den anden køres:
            npmm run devStartAuth



Login-funk virker ikke









FLOWET:
Nå man sender en POST 3000/login -----> får jeg AccessToken OG refreshToken
------> jeg bruger så denne accessToken i GET 8080/posts - headers: authorization: accessToken
    -------> når dette ikke virker mere er den løbet ud
    -------> så tager jeg refreshToken og siger POST 3000/token - body: {"token": refreshToken}
        ------> den returnerer en ny accessToken
            --------> denne indsætter jeg så i GET 8080/posts



