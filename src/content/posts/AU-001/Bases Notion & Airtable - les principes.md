---
Date première publication: 2026-02-28
Statut:
  - Done
Type:
  - ARTICLE
Publié dans:
URL: https://www.va-academy.fr/c/outils-de-base/bases-notion-airtable-les-fondamentaux
publish: true
reference: AU-001
tags:
  - AUTOMATISATIONS
---
Dans le monde tech, les bases de données sont à l'origine de toute application ou site web : c'est là que l'on stocke la donnée brute : textes, images, données personnelles, statistiques, données bancaires, de comptabilité, de finance, etc. 
Les applications et sites web sont un habillage pour ces données. 
Idem pour les IA, qui ne peuvent pas exister sans données (même si le mode de stockage est un peu différent).
On utilise très souvent Excel ou Google Sheet pour mettre en forme les données. Ces outils sont utiles mais ne sont pas des bases de données à proprement parlé, ce sont des tableurs.

**Notion et Airtable reprennent eux les concepts de bases de données** pour mettre en forme et stocker les informations, c'est pourquoi il peut y avoir quelques différences un peu déroutantes, notamment sur les **relations**. 

Je vous donne ici les concepts de bases pour construire intelligemment vos bases de données.
N'oubliez pas que des tables propres et bien gérées permettent aussi aux IA de travailler efficacement avec vous (idem pour les automatisations).

# Les données


On construit une base sur Notion ou Airtable pour y stocker de l'information, ce qu'on appelle des données en informatique.
On stocke ses données sous forme de bases (d'où bases de données...) ou tables.
## Table 
- Une Table est un tableau à double entrée, comme sur un Excel ou Google Sheet : il ya **des colonnes et des lignes**
- Une **entrée** dans une Table  correspond à une **ligne**
- Une **colonne** dans une Table est un **champs** (que l'on peut aussi appeler propriété)

**Exemple pour un petit CRM** : 
Table Contacts : 

| Prénom | Nom    | Email              |
| ------ | ------ | ------------------ |
| Marion | Dupont | m.dupont@gmail.com |
> La table Contacts a trois **colonnes**, ce sont les **champs** suivants : Nom, Prénom, Adresse Email
> La table Contacts contient un **ligne**, qui est l'**entrée** suivante : Marion, Dupont, m.dupont@gmail.com



> [!NOTE] Les termes se mélangent entre les tableurs, les bases de données industrielles et les outils comme Notion et Airtable. 
> - Une base de données au sens stricte du terme est un ensemble de tables.
> - Notion parlera plutôt de "table" comme une vue d'une "base de données". Alors qu'ici je vais utiliser le mot Table pour désigner ce que Notion appelle une "base de données" (oui on s'amuse bien ici).
> - Airtable utilise bien le terme Table pour une Table et les rassemble dans un "workspace" (qui est en fait une base de données).
> - **Quelque soit comment on l'appelle, une table ou une base, c'est un tableau avec des lignes et des colonnes.**


## Type
- Les colonnes ou champs d'une table doivent avoir un Type, **obligatoirement** (ce qui est une première différence avec Excel). Le type de la colonne/champs doit être choisi parmi ceux proposés par l'application (ils peuvent légèrement différer entre Notion et Airtable).
- Les types les plus courants : texte (chaîne de caractère), chiffre (entier, décimal, monnaie), sélection (énumération), date, case à cocher (booléen).

**Exemple** : 
Table Contacts : 

| Prénom (Texte) | Nom (Texte) | Email (Texte)      |
| -------------- | ----------- | ------------------ |
| Marion         | Dupont      | m.dupont@gmail.com |
> Sur la table Contacts, tous les champs sont de type Texte.
> Le type URL ou Email peut également exister dans certaines applications, permettant une meilleure visualisation.


## Identifiant
- La grande différence avec Excel, c'est qu'une table doit **obligatoirement avoir un identifiant** : c'est la première colonne dans Notion et Airtable.
- L'identifiant est une colonne/champs, qui se doit d'être **unique** quand on le rempli, et changer le moins possible dans le temps.
- Dans l'exemple de notre table Contacts, les champs Nom et Prénom ne peuvent pas êtres l'identifiant de la table, car il peut y avoir plusieurs personnes s'appelant Marion ou Dupont, ce n'est pas une donnée unique. L'adresse email quant a elle peut être l'identifiant, car une adresse email est forcément unique. 
- L'identifiant permets de reconnaitre à coup sur une entrée, et limite le risque de doublons. 
- Même si l'adresse email semble une bonne idée, dans notre exemple, qu'en est-il si votre contact change d'entreprise et alors d'email ?
- **L'usage le plus courant est en fait de définir un nombre, que l'on appellera ID (pour identifiant)**. Ce peut être un nombre que l'on incrémente tout simplement. Ainsi on peut changer à volonté les autres colonnes, l'identifiant de l'entrée, lui, restera le même.

**Exemple** : 
Table Contacts

| ID (id) | Prénom (Texte) | Nom (Texte) | Email (Texte)      |
| ------- | -------------- | ----------- | ------------------ |
| 1       | Marion         | Dupont      | m.dupont@gmail.com |
> Ici l'identifiant du contact Marion Dupont est "1". 
> On peut changer l'email, le nom (en cas de divorce ou mariage) ou corriger une erreur typographique, cela n'aura pas d'impact sur notre système global, l'entrée sera toujours identifiée par son champs ID "1".


> [!NOTE] D'autres identifiants sont courants dans la vie de tous les jours, et ce sont des numéros uniques (ou composantes numéros et lettres uniques) : 
> - Le numéro d'une facture
> - Le numéro de votre carte fidélité (Auchan, Carrefour, Sephora, etc.)
> - Le numéro de sécurité sociale pour les cabinets de médecins, pharmaciens, et la sécu (c'est d'ailleurs  l'identifiant le plus robuste en tant que citoyen pour l'Etat)
> - Le numéro de SIRET de votre entreprise
> - Le numéro de point de livraison du compteur électrique
> - Le numéro de suivi de votre colis
> - Le numéro de série d'un appareil
> - Le numéro de téléphone quant à lui change maintenant trop fréquemment pour être utilisé comme un identifiant pertinent

# Le design des tables


ll est important, dès le début de la création des tables, d'identifier les différentes informations dont vous avez besoin.
Pour un CRM on aura besoin, en pagaille, des informations suivantes : Nom, Prénom, Adresse Email, Numéro de téléphone, URL du profil linkedin, Poste, Entreprise, SIRET (pour les factures), Secteur, Taille de l'entreprise (Solopreneur, Startup, TPE, PME, Moyenne Entreprise, Grand compte, etc.).
On peut mettre toutes ces informations dans une grande table Notion.
Cela va poser problème au fur et à mesure que vous allez travailler avec cette table :
- ah, l'entreprise a changé de nom, je dois changer cette info sur tous les contacts. 
- ah, cette personne a changé d'entreprise, je dois écraser le SIRET et l'adresse, oui mais je ne veux pas perdre les informations sur cette entreprise et je n'ai pas encore le nouveau contact. 
- ah, j'aimerai bien rajouter le n° de TVA de l'entreprise, je dois le dupliquer sur tous les contacts qui sont dans cette entreprise.

Ce sont des petits problèmes, certes, mais ils peuvent prendre beaucoup de place plus la table grandi, et surtout, on peut les éviter.

C'est ici que rentre en jeu le design, ou architecture, des tables.
Il faut ici essayer de réfléchir aux données qui peuvent se raccrocher à un thème ou une structure commune. 
**Dès que quelques chose a plusieurs caractéristiques ou propriétés, c'est un bon signe**  : 
- un contact : un nom, un email, un numéro de téléphone
- une facture : une date, un numéro, un montant 
- un produit : un prix d'achat, un prix de vente, une description 
- une tâche : un projet, un statut, une description, une deadline
- un contenu publié : une date de publication, un type, un nombre de vues, une URL

Dans l'exemple du CRM, la meilleure idée, c'est de créer deux tables : une table Contacts, qui rassemble toutes les caractéristiques d'une personne que l'on veut contacter (Nom, Prénom, Adresse Email, Téléphone, LinkedIn, Rôle). Et une table Entreprises, qui va rassembler les caractéristiques d'une société (SIRET, Adresse, Taille, Secteur, n° de TVA).


Pensez aux changements : si vous devez recopier une donnée sur plusieurs lignes quand elle change : ce n'est pas bon, il y a surement besoin de créer un table pour cette information.

Cette construction réfléchie vous permettra également de créer des dashboard beaucoup plus rapidement et de montrer des informations intéressantes (ce qu'on appelle l'analytique).

N'hésitez pas à demander aux IA de vous aider à construire ou modifier vos tables, les modèles de base de données sont très courants.


Voici quelques tables qu'il peut être utile de créer pour une entreprise (au delà du CRM, pour vous donner matière à réflexion) : 
- Interactions (pour un CRM)
- Clients
- Devis
- Factures
- Campagnes Marketing
- Produits/Services
- Fournisseurs/Sous-Traitants
- Salariés
- Congés/Absences
- Projets
- Tâches
- Demandes SAV
- Calendrier éditorial


# Les relations


Une fois qu'on a crées plein de tables, il serait quand même bien de les lier entre elles : qu'est-ce qu'un contact sans son entreprise.
C'est ici que l'on crée une relation.
**Les relations ce sont les informations qui ont une importance pour la compréhension de la table, mais que l'on peut trouver ailleurs.**
Par exemple, dans la table Contacts, on va avoir besoin de connaître l'Entreprise dans laquelle ce contact travaille. Cela tombe bien on a crée une table Entreprises. On va alors créer une relation dans la table Contacts vers la table Entreprises.
Si plusieurs Contacts sont liés à la même entreprise, il sera ainsi plus facile de retrouver tous les contacts liés à la même entreprise, car tous les contacts concernés auront une relation vers l'entrée de la table Entreprises en question.
Aussi, une personne change de société, cela n'affecte pas l'entreprise que vous avez rentré dans la table Entreprises. Une société change de nom, ça ne change pas l'entrée de Contact dans votre table Contacts. **Cela se mettra à jour automatiquement.**
Les changements sont plus faciles et non répétitifs.


**Exemple** : 
Table Entreprises :

| ID (id) | Nom (Texte) | SIRET (Nombre) | Adresse postale (Texte)                |
| ------- | ----------- | -------------- | -------------------------------------- |
| 1       | Atom Plus   | 345768902383   | 34 Rue De Rivoli 75001 PARIS           |
| 2       | LumXY       | 678319093692   | 118 Rue Du Général Leclerc 75000 PARIS |
> Ici dans la table Entreprises il y a deux entrées renseignées.
> Et 4 champs : ID, qui est l'identifiant de la table (un nombre incrémenté), Nom, SIRET et Adresse Postale.


Table Contacts (avec une relation) :

| ID (id) | Prénom (Texte) | Nom (Texte) | Email (Texte)         | Entreprise  (Relation vers Entreprises) |
| ------- | -------------- | ----------- | --------------------- | --------------------------------------- |
| 1       | Marion         | Dupont      | m.dupont@gmail.com    | 2                                       |
| 2       | Gilles         | Carrez      | g.carrez@atomplus.com | 1                                       |
>Dans notre table Contacts, on rajoute une colonne "Entreprise", qui est une relation vers la Table Entreprises.
>On renseigne alors que Mme Dupont travaille chez LumXY (2), M. Carrez chez Atom Plus (1).
>La relation se fait obligatoirement avec l'ID de la table cible, mais on peut ensuite afficher les autres informations de la table cible, comme le nom de l'entreprise.

Table Contacts (avec une relation et un rollup) :

| ID (id) | Prénom (Texte) | Nom (Texte) | Email (Texte)         | Entreprise  (Relation vers Entreprises) | Nom Entreprise (Rollup) |
| ------- | -------------- | ----------- | --------------------- | --------------------------------------- | ----------------------- |
| 1       | Marion         | Dupont      | m.dupont@gmail.com    | 2                                       | LumXY                   |
| 2       | Gilles         | Carrez      | g.carrez@atomplus.com | 1                                       | Atom Plus               |
>Ce nouveau champ de recherche d'information est appelé un "Rollup" dans Notion et Airtable.
>On ne peut pas accéder à l'affichage des entrées de la table cible tant que la relation n'est pas d'abord crée, puis identifiée.
>En effectuant ceci, vous verrez AUSSI apparaitre, automatiquement, dans la table Entreprises une entrée relationnelle vers Contacts, terminant ainsi la relation dans les deux sens.

Table Entreprises (avec une relation) :

| ID (id) | Nom (Texte) | SIRET (Nombre) | Adresse postale (Texte)                | Contact (Relation vers Contacts) |
| ------- | ----------- | -------------- | -------------------------------------- | -------------------------------- |
| 1       | Atom Plus   | 345768902383   | 34 Rue De Rivoli 75001 PARIS           | 2                                |
| 2       | LumXY       | 678319093692   | 118 Rue Du Général Leclerc 75000 PARIS | 1                                |
> Dans la table Entreprises apparaitra les identifiants des Contacts concernés par la relation.
> On peut aussi créer un champs rollup "Nom Contact" pour avoir une vue plus compréhensible.

# Conclusion


Les champs relations permettent à votre système de base de données de rester cohérent et d'effectuer des calculs et des filtres avancés  : qui sont les contacts travaillants chez LumXY ? Combien de contacts travaillent chez Atom Plus ? Et vice-versa.

L'identifiant d'une table permets de faire des modifications sur les entrées sans "casser" toute la logique des relations : si le nom de l'entreprise change, le rollup "Nom Entreprise" se met à jour automatiquement dans la base Contacts. Si le nom d'une personne change, elle restera toujours dans la même relation avec l'Entreprise, car c'est l'identifiant qui sert à faire la relation, et non le nom de la personne.

Il est important de réfléchir, au début et au fur et à mesure, de la construction de plusieurs ou de nouvelles tables pour stocker les informations de manière réfléchie, pour limiter les changements et améliorer la lisibilité des données.

Vous pouvez aussi me poser des questions et me demander des conseils bien sûr.

Si vraiment vous voulez aller plus loin, vous pouvez aller voir ou discuter avec ChatGPT/Claude de base de données relationnelles, et de modélisation type UML, avec des exemples précis ou de clients c'est toujours intéressant.
