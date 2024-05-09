# App

GymPass style app.

## RFs (Requisitos Funcionais)

- [ ] Deve ser possível se cadastrar.
- [ ] Deve ser possível se autenticar.
- [ ] Deve ser possível obter o perfil do usuário autenticado.
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário autenticado.
- [ ] Deve ser possível o usuário obter seu histórico de check-ins.
- [ ] Deve ser possível o usuário buscar academias pelo nome.
- [ ] Deve ser possível o usuário realizar check-in em uma academia.
- [ ] Deve ser possível validar o check-in de um usuário.

## RNs (Regras de Negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado.
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia.
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia.
- [ ] O check-in só pode ser validado até 20 minutos após criado.
- [ ] O check-in só pode ser validado por administradores.
- [ ] Academia só pode ser cadastrada por administradores.

## RNFs (Requisitos Não Funcionais)

- [ ] A senha do usuário deve ser criptografada.
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL.
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página.
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token).